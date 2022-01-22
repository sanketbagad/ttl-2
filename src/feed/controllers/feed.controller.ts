import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { Observable, skip } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(
        private readonly feedService: FeedService
    ) {}

    @Roles(Role.ADMIN, Role.PREMIUM)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    create(@Body()  post: FeedPost, @Request() req ): Observable<FeedPost> {
       return this.feedService.createPost(req.user, post);
    }

    @Get()
    findAll(): Observable<FeedPost[]> {
        return this.feedService.findAll();
    }

    @Get()
    findSelected(@Query("take") take: number = 1, @Query("skip") skip: number): Observable<FeedPost[]> {
        take = take > 20 ? 20 : take;
        return this.feedService.findPost(take, skip);
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(@Body() post: FeedPost, @Param('id') id: number): Observable<UpdateResult> {
        return this.feedService.updatePost(id, post);
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
