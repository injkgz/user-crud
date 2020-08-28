import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entity/group.entity';
import { GroupResolver } from './group.resolver';

@Module({
  providers: [GroupService, GroupResolver],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  exports: [GroupService],
})
export class GroupModule {}
