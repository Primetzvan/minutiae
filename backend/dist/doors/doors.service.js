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
exports.DoorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const door_entity_1 = require("./entities/door.entity");
let DoorsService = class DoorsService {
    constructor(doorRepository) {
        this.doorRepository = doorRepository;
    }
    findAll() {
        return this.doorRepository.find();
    }
    async findOneById(uuid) {
        const door = await this.doorRepository.findOne({ uuid: uuid }, {
            relations: ['accessors'],
        });
        if (!door) {
            throw new common_1.NotFoundException(`door #${uuid} not found`);
        }
        return door;
    }
    create(createDoorDto) {
        const door = this.doorRepository.create(createDoorDto);
        return this.doorRepository.save(door).catch((err) => {
            if (err && err.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException({
                    message: 'IP and doorname must be unique',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    message: err.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async update(uuid, updateDoorDto) {
        const door = await this.doorRepository.preload(Object.assign({ uuid: uuid }, updateDoorDto));
        if (!door) {
            throw new common_1.NotFoundException(`Door '${uuid}' not found`);
        }
        return this.doorRepository.save(door).catch((err) => {
            if (err && err.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException({
                    message: 'Ip address and doorname must be unique',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    message: err.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async remove(uuid) {
        const door = await this.findOneById(uuid);
        return this.doorRepository.remove(door);
    }
};
DoorsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(door_entity_1.Door)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoorsService);
exports.DoorsService = DoorsService;
//# sourceMappingURL=doors.service.js.map