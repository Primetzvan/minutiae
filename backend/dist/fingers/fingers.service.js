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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FingersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const finger_entity_1 = require("./entities/finger.entity");
const user_entity_1 = require("../users/entities/user.entity");
let FingersService = class FingersService {
    constructor(fingerRepository, userRepository) {
        this.fingerRepository = fingerRepository;
        this.userRepository = userRepository;
    }
    async create(createFingerDto) {
        let user = await this.userRepository.findOne({
            uuid: createFingerDto.userId,
        }, {
            relations: ['finger'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User '${createFingerDto.userId}' not found`);
        }
        else if (user.finger !== null) {
            throw new common_1.BadRequestException(`User '${createFingerDto.userId}' already has a finger, please remove finger before creating a new one`);
        }
        const f = this.fingerRepository.create();
        await this.fingerRepository.save(f);
        user = await this.userRepository.preload({
            uuid: createFingerDto.userId,
            finger: f,
        });
        return this.userRepository.save(user);
    }
    async remove(userId) {
        let user = await this.userRepository.findOne({ uuid: userId }, {
            relations: ['finger'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User '${userId}' not found`);
        }
        const finger = user.finger;
        user = await this.userRepository.preload({
            uuid: userId,
            finger: null,
        });
        await this.userRepository.save(user);
        if (!finger) {
            throw new common_1.NotFoundException(`User '${userId}' has no finger`);
        }
        return this.fingerRepository.remove(finger);
    }
};
FingersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(finger_entity_1.Finger)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FingersService);
exports.FingersService = FingersService;
//# sourceMappingURL=fingers.service.js.map