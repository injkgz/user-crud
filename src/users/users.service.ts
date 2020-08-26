import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersDto } from './dto/users.dto';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private groupsService: GroupService,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async addFriend(userId: string, friendId: string): Promise<UsersDto> {
    const user = await this.usersRepository.findOne({ id: userId });
    const friend = await this.usersRepository.findOne({ id: friendId });
    if (!user || !friend) {
      throw new HttpException('Choosen user or friend does not exists', 500);
    }
    let friends = user.friends;
    if (!friends) {
      friends = [];
    } else if (friends.includes(friend.id)) {
      throw new HttpException('Users are already friends', 500);
    }
    friends.push(friend.id);

    let friendFriends = friend.friends;
    if (!friendFriends) {
      friendFriends = [];
    }
    friendFriends.push(user.id);
    await this.usersRepository.save({ id: friend.id, friends: friendFriends });

    return this.usersRepository.save({ id: user.id, friends });
  }
  async getAllFriends(userId: string): Promise<Users[]> {
    const user = await this.usersRepository.findOne({ id: userId });
    return this.usersRepository.findByIds(user.friends);
  }

  async create(createUsersDto: CreateUsersDto): Promise<UsersDto> {
    const user = await this.usersRepository.findOne({
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

    return this.usersRepository.save(createUsersDto);
  }
}
