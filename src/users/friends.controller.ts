import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersDto } from './dto/users.dto';
import { create } from 'domain';

@Controller('friends')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Get all user's friend query
   *
   */
  @Get()
  getAllFriends(@Body() userId: string): Promise<Users[]> {
    return this.usersService.findAll();
  }
  /**
   * Add friend to user query
   *
   * @param createUsersDto
   */
  @Post()
  addFriend(@Body() userId: string, friendId: string): Promise<UsersDto> {
    return null;
  }
}
