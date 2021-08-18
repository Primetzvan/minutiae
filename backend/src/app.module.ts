import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoorsController } from './doors/doors.controller';
import { DoorsService } from './doors/doors.service';
import { FingersController } from './fingers/fingers.controller';
import { FingersService } from './fingers/fingers.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsModule } from './doors/doors.module';
import { FingersModule } from './fingers/fingers.module';
import { AccessesController } from './accesses/accesses.controller';
import { AccessesModule } from './accesses/accesses.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DoorsModule,
    FingersModule,
    AccessesModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'mariadb',
      autoLoadEntities: true,
      synchronize: true, // DISABLE in production
    }),
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
  ],
  controllers: [
    AppController,
    AccessesController,
  ],
  providers: [AppService],
})
export class AppModule {}
