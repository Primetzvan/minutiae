import { Finger } from '../../fingers/entities/finger.entity';
import { Door } from '../../doors/entities/door.entity';
export declare class User {
    uuid: string;
    username: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    password: string;
    role: UserRole;
    finger: Finger;
    accesses: Door[];
    currentHashedRefreshToken: string;
}
export declare enum UserRole {
    USER = "User",
    ADMIN = "Admin"
}
