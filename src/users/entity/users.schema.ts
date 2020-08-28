import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  nickname: string;
  @Prop()
  email: string;
  @Prop([String])
  groupId?: string[];
  @Prop([String])
  friends?: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
