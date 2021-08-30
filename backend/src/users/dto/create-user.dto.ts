import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
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
  @MaxLength(30)
  //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsString()
  readonly currentHashedRefreshToken?: string;
}
