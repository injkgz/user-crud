import { Length } from 'class-validator';

/**
 * GroupDto dto class
 */
export class GroupDto {
  /**
   * Title of group
   *
   */
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
