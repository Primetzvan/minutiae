import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsString()
  readonly username: string;
}

export class AdditionalUserInfo {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly phonenumber: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsString()
  readonly currentHashedRefreshToken?: string;
}
