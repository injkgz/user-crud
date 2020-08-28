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
    const user = await this.usersModel.findOne({ _id: userId });
    const friend = await this.usersModel.findOne({ _id: friendId });
    if (!user || !friend) {
      throw new HttpException('Choosen user or friend does not exists', 500);
    }
    user.friends = user.friends.filter(u => u !== friendId);
    friend.friends = friend.friends.filter(u => u !== userId);

    await this.usersModel.updateOne(
      { _id: friend._id },
      { friends: friend.friends },
    );
    return this.usersModel.findOneAndUpdate(
      { _id: user._id },
      { friends: user.friends },
      { new: true },
    );
  }

  async addFriend(userId: string, friendId: string): Promise<UsersModel> {
    const user = await this.usersModel.findOne({ _id: userId });
    const friend = await this.usersModel.findOne({ _id: friendId });
    if (!user || !friend) {
      throw new HttpException('Choosen user or friend does not exists', 500);
    }
    user.friends = user.friends.filter(u => u !== friendId);
    friend.friends = friend.friends.filter(u => u !== userId);
    user.friends.push(friendId);
    friend.friends.push(userId);
    const { ok } = await this.usersModel.updateOne(
      { _id: friend._id },
      { friends: friend.friends },
    );
    if (ok > 0) {
      return this.usersModel.findOneAndUpdate(
        { _id: user._id },
        { friends: user.friends },
        { new: true },
      );
    } else {
      throw new HttpException('Error while adding friends', 500);
    }
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
