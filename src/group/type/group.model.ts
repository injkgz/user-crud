import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupType {
  @Field(type => ID)
  _id: string;
  @Field()
  title: string;
}
