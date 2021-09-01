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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_repository_1 = require("./repositories/user.repository");
const door_entity_1 = require("../doors/entities/door.entity");
let UsersService = class UsersService {
    constructor(userRepository, doorRepository) {
        this.userRepository = userRepository;
        this.doorRepository = doorRepository;
    }
    findAll() {
        return this.userRepository.find({
            relations: ['finger', 'accesses'],
        });
    }
    async findOneById(id) {
        const user = await this.userRepository.findOne({ uuid: id }, {
            relations: ['accesses', 'finger'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`user #${id} not found`);
        }
        return user;
    }
    async findOne(usernameormail) {
        let user;
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(String(usernameormail).toLowerCase())) {
            user = await this.userRepository.findOne({ email: usernameormail });
        }
        if (!user) {
            user = await this.userRepository.findOne({ username: usernameormail });
        }
        return user;
    }
    create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user).catch((err) => {
            if (err && err.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException({
                    message: 'Username must be unique',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    message: err.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.preload(Object.assign({ uuid: id }, updateUserDto));
        if (!user) {
            throw new common_1.NotFoundException(`User with id #'${id}' not found`);
        }
        if (user.role == user_entity_1.UserRole.USER && user.password != null) {
            user.password = null;
        }
        if (user.role !== user_entity_1.UserRole.ADMIN && updateUserDto.password != null) {
            throw new common_1.BadRequestException("User with Role 'User' cant have a password");
        }
        else if (updateUserDto.role == user_entity_1.UserRole.ADMIN &&
            updateUserDto.password == null) {
            throw new common_1.BadRequestException("User with Role 'Admin' must have a password");
        }
        else if (updateUserDto.role == user_entity_1.UserRole.ADMIN &&
            updateUserDto.password != null) {
            user.password = await this.generateHash(updateUserDto.password);
        }
        return this.userRepository.save(user).catch((err) => {
            if (err && err.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException({
                    message: 'Username must be unique',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    message: err.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async generateHash(password) {
        const saltOrRounds = 5;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async remove(id) {
        const user = await this.findOneById(id);
        return this.userRepository.remove(user);
    }
    async addAccess(createAccessDto) {
        var _a;
        const door = await this.doorRepository.findOne({
            uuid: createAccessDto.doorId,
        });
        if (!door) {
            throw new common_1.NotFoundException(`Door '${createAccessDto.doorId}' not found`);
        }
        let user = await this.userRepository.findOne({
            uuid: createAccessDto.userId,
        }, {
            relations: ['accesses'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User '${createAccessDto.userId}' not found`);
        }
        const accesses = (_a = user.accesses) !== null && _a !== void 0 ? _a : [];
        if (user.accesses != []) {
            accesses.forEach(function (door) {
                if (door.uuid === createAccessDto.doorId) {
                    throw new common_1.BadRequestException(`User '${createAccessDto.userId}' already has access to door '${createAccessDto.doorId}'`);
                }
            });
        }
        accesses.push(door);
        user = await this.userRepository.preload({
            uuid: createAccessDto.userId,
            accesses: accesses,
        });
        return this.userRepository.save(user);
    }
    async removeAccess(createAccessDto) {
        var _a;
        const { userId, doorId } = createAccessDto;
        const door = await this.doorRepository.findOne({
            uuid: doorId,
        });
        if (!door) {
            throw new common_1.NotFoundException(`Door '${doorId}' not found`);
        }
        let user = await this.userRepository.findOne({
            uuid: userId,
        }, {
            relations: ['accesses'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User '${userId}' not found`);
        }
        const accesses = (_a = user.accesses) !== null && _a !== void 0 ? _a : [];
        let found = false;
        let index = 0;
        accesses.forEach(function (door) {
            if (door.uuid === doorId) {
                accesses.splice(index, 1);
                found = true;
            }
            index++;
        });
        if (!found) {
            throw new common_1.BadRequestException(`User '${userId}' has no Access to Door '${doorId}'`);
        }
        user = await this.userRepository.preload({
            uuid: userId,
            accesses: accesses,
        });
        await this.userRepository.save(user);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_2.InjectRepository(door_entity_1.Door)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map