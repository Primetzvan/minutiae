import { AdditionalUserInfo, CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto & AdditionalUserInfo>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
