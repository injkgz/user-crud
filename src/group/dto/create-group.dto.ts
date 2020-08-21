import { Length, IsNotEmpty } from 'class-validator';

/**
 * createGroupDto dto class
 */
export class CreateGroupDto {
  /**
   * Title of group
   *
   */
  @IsNotEmpty()
  @Length(3, 50)
  title: string;
}
