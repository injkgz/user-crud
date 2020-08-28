import { Length, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * createGroupDto dto class
 */
@InputType()
export class CreateGroupDto {
  /**
   * Title of group
   *
   */
  @Field()
  @IsNotEmpty()
  @Length(3, 50)
  title: string;
}
