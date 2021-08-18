"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const doors_service_1 = require("./doors.service");
const doors_controller_1 = require("./doors.controller");
const door_entity_1 = require("./entities/door.entity");
let DoorsModule = class DoorsModule {
};
DoorsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([door_entity_1.Door])],
        providers: [doors_service_1.DoorsService],
        controllers: [doors_controller_1.DoorsController],
        exports: [doors_service_1.DoorsService],
    })
], DoorsModule);
exports.DoorsModule = DoorsModule;
//# sourceMappingURL=doors.module.js.map