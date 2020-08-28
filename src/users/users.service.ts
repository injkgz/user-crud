import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from './input/create-users.type';
import { GroupService } from 'src/group/group.service';
import { Model } from 'mongoose';
import { Users } from './entity/users.schema';
import { UsersModel } from './type/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private groupsService: GroupService,
  ) {}

  async findAll(): Promise<UsersModel[]> {
    return this.usersModel.find();
  }
  async findOneById(id: string): Promise<UsersModel> {
    return this.usersModel.findOne({ id });
  }

  async updateById(id: string, nickname: string): Promise<UsersModel> {
    return this.usersModel.updateOne({ id }, { nickname });
  }

  async removeFriend(userId: string, friendId: string): Promise<UsersModel> {
    const user = await this.usersModel.findOne({ id: userId });
    const friend = await this.usersModel.findOne({ id: friendId });
    if (!user || !friend) {
      throw new HttpException('Choosen user or friend does not exists', 500);
    }
    const friends = user.friends;
    if (!friends) {
      throw new HttpException("Current user doesn't have any friends!", 500);
    }
    const index = friends.indexOf(friend._id);
    if (index < 0) {
      throw new HttpException("Users aren't friends!", 500);
    }
    friends.splice(index, index);
    const friendFriends = friend.friends;
    if (!friendFriends) {
      throw new HttpException("Current user doesn't have any friends!", 500);
    }
    const friendIndex = friends.indexOf(friend._id);
    if (friendIndex < 0) {
      throw new HttpException("Users aren't friends!", 500);
    }
    friendFriends.splice(friendIndex, friendIndex);

    await this.usersModel.updateOne(
      { id: friend._id },
      { friends: friendFriends },
    );
    return this.usersModel.updateOne({ id: user._id }, { friends });
  }

  async addFriend(userId: string, friendId: string): Promise<UsersModel> {
    const user = await this.usersModel.findOne({ id: userId });
    const friend = await this.usersModel.findOne({ id: friendId });
    if (!user || !friend) {
      throw new HttpException('Choosen user or friend does not exists', 500);
    }
    let friends = user.friends;
    if (!friends) {
      friends = [];
    } else if (friends.includes(friend._id)) {
      throw new HttpException('Users are already friends', 500);
    }
    friends.push(friend._id);

    let friendFriends = friend.friends;
    if (!friendFriends) {
      friendFriends = [];
    }
    friendFriends.push(user._id);
    await this.usersModel.updateOne(
      { id: friend._id },
      { friends: friendFriends },
    );

    return this.usersModel.updateOne({ id: user.id }, { friends });
  }
  async getAllFriends(userId: string): Promise<UsersModel[]> {
    const user = await this.usersModel.findOne({ id: userId });
    if (user.friends) {
      return this.usersModel.find(user.friends);
    } else {
      throw new HttpException('User does not have any friends', 500);
    }
  }

  async create(createUsersDto: CreateUsersDto): Promise<UsersModel> {
    const user = await this.usersModel.findOne({
      email: createUsersDto.email,
    });

    if (user) {
      throw new HttpException('User already exits', 500);
    }
    if (createUsersDto.groupId) {
      const groups = await this.groupsService.findById(createUsersDto.groupId);
      if (groups.length !== createUsersDto.groupId.length) {
        throw new HttpException('One of groupIds is invalid', 500);
      }
    }

    return this.usersModel.create(createUsersDto);
  }
}
