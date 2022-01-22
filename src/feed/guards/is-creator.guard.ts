import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/models/user.class';
import { AuthService } from 'src/auth/services/auth.service';
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
  }
}
