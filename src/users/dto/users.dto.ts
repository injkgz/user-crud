import { IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';

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
  name: string;

  /**
   * Full name user
   *
   */
  @IsOptional()
  @Length(3, 50)
  fullName?: string;

  /**
   * Group ID the user belongs to
   *
   */
  @IsOptional()
  @Length(36, 255, {each: true})
  groupId?: string[];

  /**
   * Phone number user
   *
   */
  @IsPhoneNumber('ZZ')
  phone: string;
  /**
   * The "constructor"
   *
   * @param partial
   */
  constructor(partial?: Partial<UsersDto>) {
    Object.assign(this, partial);
  }
}
