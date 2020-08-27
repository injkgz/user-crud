import { Length } from 'class-validator';
import { Field, InterfaceType } from '@nestjs/graphql';

/**
 * GroupDto dto class
 */
@InterfaceType()
export class GroupDto {
  /**
   * Title of group
   *
   */
  @Field()
  @Length(3, 50)
  title: string;
  /**
   * The "constructor"
   *
   * @param partial
   */
  constructor(partial?: Partial<GroupDto>) {
    Object.assign(this, partial);
  }
}
