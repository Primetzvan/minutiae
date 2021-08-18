import {
  Column,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Finger } from '../../fingers/entities/finger.entity';
import { Door } from '../../doors/entities/door.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  // auto increment id shouldnt be used external => generated uuid
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ default: 'User' }) // Default: User
  role: UserRole;

  @OneToOne(() => Finger)
  @JoinColumn()
  finger: Finger;

  @ManyToMany(() => Door, (door) => door.accessors, {
    cascade: true,
  })
  @JoinTable({ name: 'accesses' })
  accesses: Door[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
}

/* TEST:
      {
       accesses: [],
       email: 'max.musterman@gmail.com',
       firstname: 'max',
       lastname: 'mustermann',
       password: 'geheim',
       phonenumber: '0667/99021145',
       finger: undefined,
       role: 'User',
       username: maxi
      };
 */

export enum UserRole {
  USER = 'User',
  ADMIN = 'Admin',
}
