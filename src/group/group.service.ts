import { HttpException, Injectable } from '@nestjs/common';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find();
  }
  async findById(groupIds: string[]): Promise<Group[]> {
    return this.groupModel.find({
      _id: { $in: groupIds },
    });
  }
  async updateById(id: string, createGroupDto: CreateGroupDto): Promise<Group> {
    const { title } = createGroupDto;
    return this.groupModel.updateOne({ id }, { title });
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupModel.findOne({
      title: createGroupDto.title,
    });

    if (group) {
      throw new HttpException('Group already exits', 500);
    }

    return this.groupModel.create(createGroupDto);
  }
}
