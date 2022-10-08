import { EntityRepository, Repository } from 'typeorm';
import { Access } from '../entities/access.entity';

@EntityRepository(Access)
export class AccessRepository extends Repository<Access> {}
