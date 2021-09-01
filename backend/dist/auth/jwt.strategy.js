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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'jwt') {
    constructor(userService, configService) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('FRONTEND_KEY'),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const access_token = request === null || request === void 0 ? void 0 : request.cookies['ACCESS_TOKEN_COOKIE'];
                    if (!access_token) {
                        return null;
                    }
                    return access_token;
                },
            ]),
        });
        this.userService = userService;
        this.configService = configService;
    }
    async validate(payload) {
        return {
            currentHashedRefreshToken: '',
            accesses: [],
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            phonenumber: '',
            finger: undefined,
            role: user_entity_1.UserRole.USER,
            uuid: payload.sub,
            username: payload.username,
        };
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map