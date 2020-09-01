import { HttpException, Injectable } from '@nestjs/common';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './input/create-group.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Engine } from 'json-rules-engine';
import { request, gql } from 'graphql-request';

@Injectable()
export class GroupService {
  private ruleEngine = new Engine();
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
    const query = gql`
      {
        rules(type: "group")
      }
    `;
    let { rules } = await request('http://localhost:3001/graphql', query);
    console.log(rules);
    rules = JSON.parse(rules);
    this.ruleEngine.addRule(rules);
    const fact = { group: createGroupDto };
    const results = await this.ruleEngine.run(fact).catch(err => {
      throw new HttpException(err, 500);
    });
    if (!results.events.length) {
      throw new HttpException(
        "It's unable to create group with this title",
        500,
      );
    } else {
      const group = await this.groupModel.findOne({
        title: createGroupDto.title,
      });

      if (group) {
        throw new HttpException('Group already exits', 500);
      }

      return this.groupModel.create(createGroupDto);
    }
  }
}
