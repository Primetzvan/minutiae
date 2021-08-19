import { IsString } from 'class-validator';

export class CreateAccessDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly doorId: string;
}
