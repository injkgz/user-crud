import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entity/group.entity';
import { GroupResolver } from './group.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
