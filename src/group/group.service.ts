import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }
  async findById(groupIds: string[]): Promise<Group[]> {
    return this.groupRepository.find({
      id: In(groupIds),
    });
  }
  async updateById(id: string, createGroupDto: CreateGroupDto): Promise<Group> {
    const { title } = createGroupDto;
    return this.groupRepository.save({ id, title });
  }

  async create(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    const group = await this.groupRepository.findOne({
      title: createGroupDto.title,
    });

    if (group) {
      throw new HttpException('Group already exits', 500);
    }

    return this.groupRepository.save(createGroupDto);
  }
}
