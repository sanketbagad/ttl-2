import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/auth/models/user.class';
import { AuthService } from 'src/auth/services/auth.service';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {

  constructor (private authService: AuthService, private feedService: FeedService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const {user, params}: { user: User, params: {id: number}} = request

    if(!user || !params) {
      return false
    }

    if(user.role === 'admin') {
      return true
    }

    const userId = user.id
    const postId = params.id
    
    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) => this.feedService.findPostById(postId).pipe(
        map((feedPost: FeedPost) => {
          let isAuthor = user.id === feedPost.author.id
          return isAuthor
        }),
      ))
    )

  }
}
