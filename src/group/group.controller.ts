import { Body, Controller, Get, Post } from '@nestjs/common';
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
   * Create group query
   *
   * @param createGroupDto
   */
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupService.create(createGroupDto);
  }
}
