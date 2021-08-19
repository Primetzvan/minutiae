import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsModule } from './doors/doors.module';
import { FingersModule } from './fingers/fingers.module';
import { ConfigModule } from "@nestjs/config";
import { AccessesController } from './accesses/accesses.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DoorsModule,
    FingersModule,
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
  controllers: [AppController, AccessesController],
  providers: [AppService],
})
export class AppModule {}
