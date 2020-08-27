import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from './type/users.model';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { EditFriendsDto } from './dto/editFriends.dto';
import { UsersDto } from './dto/users.dto';

@Resolver(Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Users)
  async user(@Args('id') id: string): Promise<Users> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Query(() => [Users])
  users(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => Users)
  async createUser(
    @Args('createUsersDto') createUsersDto: CreateUsersDto,
  ): Promise<Users> {
    const recipe = await this.usersService.create(createUsersDto);
    return recipe;
  }

  /**
   * update any user by id
   * @param id id of user
   * @param nickname object of user fields
   */
  @Mutation(() => Users)
  async updateUser(
    @Args('input') id: string,
    nickname: string,
  ): Promise<Users> {
    return await this.usersService.updateById(id, nickname);
  }
  /**
   * Get all user's friend query
   *
   */
  @Query(() => [Users])
  getAllFriends(@Args('userId') userId: string): Promise<Users[]> {
    return this.usersService.getAllFriends(userId);
  }
  /**
   * Add friend to user query
   *
   * @param createUsersDto
   */
  @Mutation(() => Users)
  editFriends(@Args('input') input: EditFriendsDto): Promise<UsersDto> {
    const { userId, friendId, isAdding } = input;
    if (isAdding) {
      return this.usersService.addFriend(userId, friendId);
    } else {
      return this.usersService.removeFriend(userId, friendId);
    }
  }
}
