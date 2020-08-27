import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupResolver } from './group.resolver';

@Module({
  providers: [GroupService, GroupResolver],
  imports: [TypeOrmModule.forFeature([Group])],
  exports: [GroupService],
})
export class GroupModule {}
