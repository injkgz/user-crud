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
   * Name client
   *
   */
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  phone: string;
}
