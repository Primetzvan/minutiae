"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const doors_module_1 = require("./doors/doors.module");
const fingers_module_1 = require("./fingers/fingers.module");
const accesses_controller_1 = require("./accesses/accesses.controller");
const accesses_module_1 = require("./accesses/accesses.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            doors_module_1.DoorsModule,
            fingers_module_1.FingersModule,
            accesses_module_1.AccessesModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mariadb',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'test',
                database: 'mariadb',
                autoLoadEntities: true,
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        ],
        controllers: [
            app_controller_1.AppController,
            accesses_controller_1.AccessesController,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map