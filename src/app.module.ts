import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [Users],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
