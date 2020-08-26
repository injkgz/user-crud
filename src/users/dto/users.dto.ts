import { IsEmail, IsOptional, Length } from 'class-validator';

/**
 * UsersDto dto class
 */
export class UsersDto {
  /**
   * Email address
   *
   */
  @IsEmail()
  @Length(3, 70)
  email: string;

  /**
   * Name user
   *
   */
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

  /**
   * The "constructor"
   *
   * @param partial
   */
  constructor(partial?: Partial<UsersDto>) {
    Object.assign(this, partial);
  }
}
