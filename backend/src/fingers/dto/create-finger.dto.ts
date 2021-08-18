import { IsInt, IsString } from 'class-validator';

export class CreateFingerDto {
  @IsString()
  readonly userUIDD: string;
}
