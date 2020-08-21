import { IsEmail, IsOptional, Length, IsPhoneNumber } from 'class-validator';

/**
 * CreateClientDto dto class
 */
export class CreateUsersDto {
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
}
