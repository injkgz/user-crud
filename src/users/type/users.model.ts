import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersModel {
  @Field(type => ID)
  _id: string;
  @Field()
  nickname: string;
  @Field()
  email: string;
  @Field(type => [String], { nullable: true })
  groupId?: string[];
  @Field(type => [String], { nullable: true })
  friends?: string[];
}
