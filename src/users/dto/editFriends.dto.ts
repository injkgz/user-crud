import { Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * AddFriendsDto dto class
 */
@InputType()
export class EditFriendsDto {
  /**
   * Email address
   *
   */
  @Field()
  @IsNotEmpty()
  @Length(10, 255)
  userId: string;

  /**
   * Name user
   *
   */
  @Field(type => [String], { nullable: true })
  @IsNotEmpty()
  @Length(10, 255)
  friendId: string;
  /**
   * Name user
   *
   * if true: we add friend, else we remove friend
   */
  @Field(type => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isAdding: boolean;
}
