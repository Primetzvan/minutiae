import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Finger {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToOne(() => User, { nullable: false })
  user: User;
}
