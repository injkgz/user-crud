import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupModule } from './group/group.module';
import { join } from 'path';

const username = 'postgres';
const password = 'example';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username,
      password,
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    GroupModule,
    GraphQLModule.forRoot({autoSchemaFile: join(process.cwd(), 'src/schema.gql')}),
  ],
})
export class AppModule {}
