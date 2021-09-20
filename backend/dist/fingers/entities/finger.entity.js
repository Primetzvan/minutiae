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
exports.FingerStatus = exports.Finger = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Finger = class Finger {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Finger.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Finger.prototype, "externalId", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], Finger.prototype, "sessionId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Finger.prototype, "sessionExpires", void 0);
__decorate([
    typeorm_1.Column({ default: 'running' }),
    __metadata("design:type", String)
], Finger.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, (user) => user.finger, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Finger.prototype, "user", void 0);
Finger = __decorate([
    typeorm_1.Entity()
], Finger);
exports.Finger = Finger;
var FingerStatus;
(function (FingerStatus) {
    FingerStatus["RUNNING"] = "running";
    FingerStatus["OK"] = "ok";
    FingerStatus["FAILED"] = "failed";
})(FingerStatus = exports.FingerStatus || (exports.FingerStatus = {}));
//# sourceMappingURL=finger.entity.js.map