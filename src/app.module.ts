import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'test',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    GroupModule,
  ],
})
export class AppModule {}
