import { FeedPostEntity } from "src/feed/models/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FriendRequestEntity } from "./freind-req.entity";
import { Role } from "./role.enum";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role

  @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
    feedPosts: FeedPostEntity[];

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  imagePath: string;

  @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.creator)
  sentFriendRequest: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.reciever)
  recievedFriendRequest: FriendRequestEntity[];

}