import { Length, IsNotEmpty, IsBoolean } from 'class-validator';

/**
 * AddFriendsDto dto class
 */
export class EditFriendsDto {
  /**
   * Email address
   *
   */
  @IsNotEmpty()
  @Length(10, 255)
  userId: string;

  /**
   * Name user
   *
   */
  @IsNotEmpty()
  @Length(10, 255)
  friendId: string;
  /**
   * Name user
   *
   * if true: we add friend, else we remove friend
   */
  @IsNotEmpty()
  @IsBoolean()
  isAdding: boolean;
}
