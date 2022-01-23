import { FeedPost } from "src/feed/models/post.interface";
import { Role } from "./role.enum";

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string;
    posts?: FeedPost[];
    imagePath?: string;
}