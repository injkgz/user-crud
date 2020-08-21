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
  name: string;

   /**
   * Group ID the user belongs to
   *
   */
  @IsOptional()
  @Length(36, 255)
  groupId?: string[];

  /**
   * Full name user
   *
   */
  @IsOptional()
  @Length(3, 50)
  fullName?: string;

  /**
   * Phone number user
   *
   */
  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  phone: string;
}
