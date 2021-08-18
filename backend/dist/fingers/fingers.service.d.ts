import { Repository } from 'typeorm';
import { Finger } from './entities/finger.entity';
export declare class FingersService {
    private readonly fingerRepository;
    constructor(fingerRepository: Repository<Finger>);
}
