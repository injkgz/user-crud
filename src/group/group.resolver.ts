import { GroupService } from './group.service';
import { CreateGroupDto } from './input/create-group.input';
import { Group } from './entity/group.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupType } from './type/group.model';

@Resolver(Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}
  /**
   * Get groups query
   *
   */
  @Query(() => [GroupType])
  findAll(): Promise<GroupType[]> {
    return this.groupService.findAll();
  }
  /**
   * Get groups by ID
   * @param id - id of group
   */
  @Query(() => [GroupType])
  async getOne(@Args('id') id: string): Promise<GroupType[]> {
    return this.groupService.findById([id]);
  }
  /**
   * update any group by id
   * @param id id of group
   * @param createGroupDto object of group fields
   */
  @Mutation(() => [GroupType])
  async update(
    @Args('input') id: string,
    createGroupDto: CreateGroupDto,
  ): Promise<GroupType> {
    const group = await this.groupService.updateById(id, createGroupDto);
    return group;
  }

  /**
   * Create group query
   *
   * @param createGroupDto
   */
  @Mutation(() => GroupType)
  createGroup(
    @Args('createGroupDto') createGroupDto: CreateGroupDto,
  ): Promise<GroupType> {
    return this.groupService.create(createGroupDto);
  }
}
