import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity()
export class Finger {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  externalId: string;

  @Column({ unique: true, nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  sessionExpires: Date;

  @Column({ default: 'running' })
  status: FingerStatus;

  @OneToOne(() => User, (user) => user.finger, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

export enum FingerStatus {
  RUNNING = 'running',
  OK = 'ok',
  FAILED = 'failed',
}
