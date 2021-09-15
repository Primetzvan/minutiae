"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalUserInfo = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
class CreateUserDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
exports.CreateUserDto = CreateUserDto;
class AdditionalUserInfo {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "lastname", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "phonenumber", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(30),
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEnum(user_entity_1.UserRole),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "role", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AdditionalUserInfo.prototype, "currentHashedRefreshToken", void 0);
exports.AdditionalUserInfo = AdditionalUserInfo;
//# sourceMappingURL=create-user.dto.js.map