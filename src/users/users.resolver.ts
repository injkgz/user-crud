import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from './type/users.model';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';

@Resolver(Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => Users)
  async user(@Args('id') id: string): Promise<Users> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Query(returns => [Users])
  users(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Mutation(returns => Users)
  async createUser(
    @Args('createUsersDto') createUsersDto: CreateUsersDto,
  ): Promise<Users> {
    const recipe = await this.usersService.create(createUsersDto);
    return recipe;
  }
}
