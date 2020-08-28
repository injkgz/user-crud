import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUsersDto } from './input/create-users.type';
import { EditFriendsDto } from './input/editFriends.type';
import { Users } from './entity/users.schema';
import { UsersModel } from './type/users.model';

@Resolver(()=>Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UsersModel)
  async user(@Args('id') id: string): Promise<UsersModel> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Query(() => [UsersModel])
  users(): Promise<UsersModel[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => UsersModel)
  async createUser(
    @Args('createUsersDto') createUsersDto: CreateUsersDto,
  ): Promise<UsersModel> {
    const user = await this.usersService.create(createUsersDto);
    return user;
  }

  /**
   * update any user by id
   * @param id id of user
   * @param nickname object of user fields
   */
  @Mutation(() => UsersModel)
  async updateUser(
    @Args('input') id: string,
    nickname: string,
  ): Promise<UsersModel> {
    return await this.usersService.updateById(id, nickname);
  }
  /**
   * Get all user's friend query
   *
   */
  @Query(() => [UsersModel])
  getAllFriends(@Args('userId') userId: string): Promise<UsersModel[]> {
    return this.usersService.getAllFriends(userId);
  }
  /**
   * Add friend to user query
   *
   * @param createUsersDto
   */
  @Mutation(() => Boolean)
  async editFriends(@Args('input') input: EditFriendsDto): Promise<UsersModel> {
    const { userId, friendId, isAdding } = input;
    if (isAdding) {
      return this.usersService.addFriend(userId, friendId);;
    } else {
      return this.usersService.removeFriend(userId, friendId);
    }
  }
}
