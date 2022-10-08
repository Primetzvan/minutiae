import { IsArray, IsDate, IsDateString, IsString, MinDate } from "class-validator";
import { Transform } from "class-transformer";

export class CreateAccessDto {
  @IsString()
  readonly userId: string;

  @IsArray()
  @IsString({ each: true })
  // doorIds
  readonly accesses: string[];
}

export class UpdateAccessDto {
  @IsString()
  readonly accessId: string;

  //@IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly expireDate: Date;
}
