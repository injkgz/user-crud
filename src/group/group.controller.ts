import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupDto } from './dto/group.dto';
import { Group } from './entity/group.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  /**
   * Get groups query
   *
   */
  @Get()
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }
  /**
   * Get groups by ID
   * @param id - id of group
   */
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<GroupDto[]> {
    return this.groupService.findById([id]);
  }
  /**
   * update any group by id
   * @param id id of group
   * @param createGroupDto object of group fields
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<GroupDto> {
    const group = await this.groupService.updateById(id, createGroupDto);
    return group;
  }

  /**
   * Create group query
   *
   * @param createGroupDto
   */
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupService.create(createGroupDto);
  }
}
