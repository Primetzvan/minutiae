"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessesModule = void 0;
const common_1 = require("@nestjs/common");
const accesses_service_1 = require("./accesses.service");
const accesses_controller_1 = require("./accesses.controller");
let AccessesModule = class AccessesModule {
};
AccessesModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [accesses_service_1.AccessesService],
        controllers: [accesses_controller_1.AccessesController],
        exports: [accesses_service_1.AccessesService],
    })
], AccessesModule);
exports.AccessesModule = AccessesModule;
//# sourceMappingURL=accesses.module.js.map