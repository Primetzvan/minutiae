import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Access } from '../../accesses/entities/access.entity';

@Entity()
export class Door {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  doorname: string;

  @Column({ unique: true })
  ip: string;

  @Column({ default: '#70a07c' })
  color: string;

  @OneToMany(() => Access, (accesses) => accesses.door)
  accesses: Access[];
}

Door.prototype.toString = function fingerToString() {
  return `{ #${this.uuid}, name: ${this.doorname}, ip: ${this.ip}  }`;
};
