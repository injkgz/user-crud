import { IsEmail, Length, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * CreateClientDto dto class
 */
@InputType()
export class CreateUsersDto {
  /**
   * Email address
   *
   */
  @Field()
  @IsEmail()
  email: string;

  /**
   * Name user
   *
   */
  @Field()
  @Length(3, 50)
  nickname: string;

  /**
   * Group ID the user belongs to
   *
   */
  @Field(type => [String], { nullable: true })
  @IsOptional()
  @Length(10, 255, { each: true })
  groupId?: string[];

  /**
   * FriendsId of user
   *
   */
  @Field(type => [String], { nullable: true })
  @IsOptional()
  @Length(10, 255, { each: true })
  friends?: string[];
}
