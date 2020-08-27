import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';
import { GroupModule } from 'src/group/group.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), GroupModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
