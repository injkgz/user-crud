import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersDto } from './dto/users.dto';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
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
    const newUser = _.assignIn(new UsersDto(), createUsersDto);
    return this.usersRepository.save(newUser);
  }
}
