"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FingerRepository = void 0;
const typeorm_1 = require("typeorm");
const finger_entity_1 = require("../entities/finger.entity");
let FingerRepository = class FingerRepository extends typeorm_1.Repository {
    async deleteFingerByUserId(userId) {
        const user = await this.findOne(userId);
        const query = this.createQueryBuilder('finger')
            .leftJoin('finger.user', 'user')
            .where('user.userUuid = :userId', { userId });
        const finger = await query.getOne();
        return finger;
    }
};
FingerRepository = __decorate([
    typeorm_1.EntityRepository(finger_entity_1.Finger)
], FingerRepository);
exports.FingerRepository = FingerRepository;
//# sourceMappingURL=finger.repository.js.map