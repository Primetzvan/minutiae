import { UserRole } from "../entities/user.entity";
export declare class CreateUserDto {
    readonly username: string;
}
export declare class AdditionalUserInfo {
    readonly firstname: string;
    readonly lastname: string;
    readonly phonenumber: string;
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
    readonly currentHashedRefreshToken?: string;
}
