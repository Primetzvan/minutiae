import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Door } from '../../doors/entities/door.entity';

@Entity()
export class Access {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // default: 1 year
  @Column({
    default: new Date()
      .setFullYear(new Date().getFullYear() + 1)
      .toLocaleString(),
    nullable: true,
  })
  expireDate: string | null;

  @ManyToOne(() => User, (user) => user.accesses, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Door, (door) => door.accesses, {
    eager: true,
    onDelete: 'CASCADE',
  })
  door: Door;
}
