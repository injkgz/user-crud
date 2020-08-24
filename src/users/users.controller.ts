import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersDto } from './dto/users.dto';
import { create } from 'domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Create client query
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
}
