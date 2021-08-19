import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { Door } from '../doors/entities/door.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository, Door])],
  providers: [UsersService, JwtStrategy, ConfigService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
