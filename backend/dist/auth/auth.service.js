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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../users/entities/user.entity");
const moment = require("moment");
const nanoid_1 = require("nanoid");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.uuid };
        return {
            userId: user.uuid,
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(usernameormail, pass) {
        const user = await this.usersService.findOne(usernameormail);
        if (user && user.password == pass) {
            if (user.role != user_entity_1.UserRole.ADMIN) {
                return null;
            }
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async getRefreshToken(user) {
        const userDataToUpdate = {
            refreshToken: nanoid_1.nanoid(30),
            refreshTokenExp: moment().day(7).format('YYYY/MM/DD'),
        };
        userDataToUpdate.refreshToken = await this.generateHash(userDataToUpdate.refreshToken);
        const userWithRefreshToken = {
            username: user.username,
            currentHashedRefreshToken: userDataToUpdate.refreshToken,
        };
        await this.usersService.update(user.uuid, userWithRefreshToken);
        return userDataToUpdate.refreshToken;
    }
    async validateRefreshToken(username, refreshToken) {
        const currentDate = moment().format('YYYY/MM/DD');
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }
        if (user.currentHashedRefreshToken == refreshToken) {
        }
        return user;
    }
    async generateHash(token) {
        const saltOrRounds = 5;
        return await bcrypt.hash(token, saltOrRounds);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map