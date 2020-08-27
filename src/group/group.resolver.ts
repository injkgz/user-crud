import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupDto } from './dto/group.dto';
import { Group } from './entity/group.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}
  /**
   * Get groups query
   *
   */
  @Query(() => [GroupDto])
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }
  /**
   * Get groups by ID
   * @param id - id of group
   */
  @Query(() => [GroupDto])
  async getOne(@Args('id') id: string): Promise<GroupDto[]> {
    return this.groupService.findById([id]);
  }
  /**
   * update any group by id
   * @param id id of group
   * @param createGroupDto object of group fields
   */
  @Mutation(() => [GroupDto])
  async update(
    @Args('input') id: string,
    createGroupDto: CreateGroupDto,
  ): Promise<GroupDto> {
    const group = await this.groupService.updateById(id, createGroupDto);
    return group;
  }

  /**
   * Create group query
   *
   * @param createGroupDto
   */
  @Mutation(() => GroupDto)
  createGroup(
    @Args('createGroupDto') createGroupDto: CreateGroupDto,
  ): Promise<GroupDto> {
    return this.groupService.create(createGroupDto);
  }
}
