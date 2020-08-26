import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { UsersDto } from './dto/users.dto';
import { EditFriendsDto } from './dto/editFriends.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Get all user's friend query
   *
   */
  @Get()
  getAllFriends(userId: string): Promise<Users[]> {
    return this.usersService.getAllFriends(userId);
  }
  /**
   * Add friend to user query
   *
   * @param createUsersDto
   */
  @Post()
  editFriends(@Body() input: EditFriendsDto): Promise<UsersDto> {
    const { userId, friendId, isAdding } = input;
    if (isAdding) {
      return this.usersService.addFriend(userId, friendId);
    } else {
      return this.usersService.removeFriend(userId, friendId);
    }
  }
}
