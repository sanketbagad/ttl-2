import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Observable, skip } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(
        private readonly feedService: FeedService
    ) {}

    @Post()
    create(@Body()  post: FeedPost): Observable<FeedPost> {
       return this.feedService.createPost(post);
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

    @Put(':id')
    update(@Body() post: FeedPost, @Param('id') id: number): Observable<UpdateResult> {
        return this.feedService.updatePost(id, post);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
