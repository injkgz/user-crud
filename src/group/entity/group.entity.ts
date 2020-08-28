import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({ type: ObjectId })
  id: ObjectId;
  @Prop()
  title: string;
}
export const GroupSchema = SchemaFactory.createForClass(Group);
