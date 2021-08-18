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
exports.UserRole = exports.User = void 0;
const typeorm_1 = require("typeorm");
const finger_entity_1 = require("../../fingers/entities/finger.entity");
const door_entity_1 = require("../../doors/entities/door.entity");
const class_transformer_1 = require("class-transformer");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phonenumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: 'User' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToOne(() => finger_entity_1.Finger),
    typeorm_1.JoinColumn(),
    __metadata("design:type", finger_entity_1.Finger)
], User.prototype, "finger", void 0);
__decorate([
    typeorm_1.ManyToMany(() => door_entity_1.Door, (door) => door.accessors, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'accesses' }),
    __metadata("design:type", Array)
], User.prototype, "accesses", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "User";
    UserRole["ADMIN"] = "Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
//# sourceMappingURL=user.entity.js.map