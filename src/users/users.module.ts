import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), GroupModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
