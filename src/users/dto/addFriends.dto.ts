import { Length, IsNotEmpty } from 'class-validator';

/**
 * AddFriendsDto dto class
 */
export class AddFriendsDto {
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
}
