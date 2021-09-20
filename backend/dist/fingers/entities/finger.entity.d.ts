import { User } from '../../users/entities/user.entity';
export declare class Finger {
    uuid: string;
    externalId: string;
    sessionId: string;
    sessionExpires: Date;
    status: FingerStatus;
    user: User;
}
export declare enum FingerStatus {
    RUNNING = "running",
    OK = "ok",
    FAILED = "failed"
}
