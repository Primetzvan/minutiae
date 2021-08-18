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
exports.RefreshStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("./auth.service");
let RefreshStrategy = class RefreshStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'refresh') {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(req, payload) {
        if (!payload) {
            throw new common_1.BadRequestException('invalid jwt token');
        }
        const data = req === null || req === void 0 ? void 0 : req.cookies['REFRESH_COOKIE'];
        if (!(data === null || data === void 0 ? void 0 : data.refresh_token)) {
            throw new common_1.BadRequestException('invalid refresh token');
        }
        const user = await this.authService.validateRefreshToken(payload.username, data.refresh_token);
        if (!user) {
            throw new common_1.BadRequestException('token expired');
        }
        return user;
    }
};
RefreshStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], RefreshStrategy);
exports.RefreshStrategy = RefreshStrategy;
//# sourceMappingURL=refresh.strategy.js.map