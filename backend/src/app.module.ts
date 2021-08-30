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
import { FilesGeneratorController } from './files-generator/files-generator.controller';

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
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, AccessesController, FilesGeneratorController],
  providers: [AppService],
})
export class AppModule {}
