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
exports.Door = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Door = class Door {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Door.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Door.prototype, "doorname", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Door.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column({ default: '#70a07c' }),
    __metadata("design:type", String)
], Door.prototype, "color", void 0);
__decorate([
    typeorm_1.ManyToMany(() => user_entity_1.User, (user) => user.accesses, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Door.prototype, "accessors", void 0);
Door = __decorate([
    typeorm_1.Entity()
], Door);
exports.Door = Door;
//# sourceMappingURL=door.entity.js.map