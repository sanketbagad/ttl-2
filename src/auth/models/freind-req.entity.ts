import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity("user")
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()  
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.sentFriendRequest)
  creator: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.recievedFriendRequest)
  reciever: UserEntity;

}