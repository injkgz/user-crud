import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './entity/users.schema';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    GroupModule,
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
