import {
  IsEmail,
  IsOptional,
  Length,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

/**
 * CreateClientDto dto class
 */
export class CreateUsersDto {
  /**
   * Email address
   *
   */
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 70)
  email: string;

  /**
   * Name user
   *
   */
  @IsNotEmpty()
  @Length(3, 50)
  nickname: string;

  /**
   * Group ID the user belongs to
   *
   */
  @IsOptional()
  @Length(10, 255, { each: true })
  groupId?: string[];

  /**
   * FriendsId of user
   *
   */
  @IsOptional()
  @Length(10, 255, { each: true })
  friends?: string[];
}
