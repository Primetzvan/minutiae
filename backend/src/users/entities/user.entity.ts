import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Finger } from '../../fingers/entities/finger.entity';
import { Exclude } from 'class-transformer';
import { Access } from '../../accesses/entities/access.entity';

@Entity()
export class User {
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

  @OneToOne(() => Finger, (finger) => finger.user)
  finger: Finger;

  @OneToMany(() => Access, (accesses) => accesses.user)
  accesses: Access[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken: string;
}

User.prototype.toString = function fingerToString() {
  return `{ #${this.uuid}, name: ${this.username} }`;
};

export enum UserRole {
  USER = 'User',
  LEADER = 'Leader',
  ADMIN = 'Admin',
}
