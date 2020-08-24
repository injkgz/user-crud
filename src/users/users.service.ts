import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
