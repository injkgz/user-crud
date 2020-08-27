import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Get all users query
   *
   */
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
  /**
   * Create users query
   *
   * @param createUsersDto
   */
  @Post()
  createUser(@Body() createUsersDto: CreateUsersDto): Promise<UsersDto> {
    return this.usersService.create(createUsersDto);
  }

  /**
   * update any user by id
   * @param id id of user
   * @param nickname object of user fields
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() nickname: string,
  ): Promise<UsersDto> {
    const group = await this.usersService.updateById(id, nickname);
    return group;
  }
}
