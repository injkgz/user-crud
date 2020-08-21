import { IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';

/**
 * UsersDto dto class
 */
export class UsersDto {
  /**
   * Unique user ID
   */
  @Length(36, 255)
  id: string;

  /**
   * Email address
   *
   */
  @IsEmail()
  @Length(3, 70)
  email: string;

  /**
   * Name client
   *
   */
  @Length(3, 50)
  name: string;

  /**
   * Full name client
   *
   */
  @IsOptional()
  @Length(3, 50)
  fullName?: string;

  /**
   * Phone number client
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
