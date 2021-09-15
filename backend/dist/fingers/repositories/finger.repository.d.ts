import { Repository } from 'typeorm';
import { Finger } from "../entities/finger.entity";
export declare class FingerRepository extends Repository<Finger> {
    private deleteFingerByUserId;
}
