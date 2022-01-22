import { FeedPost } from '../../feed/models/post.interface';
import { Role } from './role.enum';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  imagePath?: string;
  role?: Role;
  posts?: FeedPost[];
}