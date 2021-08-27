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
exports.DoorsController = void 0;
const common_1 = require("@nestjs/common");
const doors_service_1 = require("./doors.service");
const create_door_dto_1 = require("./dto/create-door.dto");
const update_door_dto_1 = require("./dto/update-door.dto");
let DoorsController = class DoorsController {
    constructor(doorsService) {
        this.doorsService = doorsService;
    }
    async findAll(req) {
        return this.doorsService.findAll();
    }
    findOne(uuid) {
        return this.doorsService.findOneById(uuid);
    }
    async create(response, createDoorDto) {
        const zip = await this.doorsService.createZipRepo(createDoorDto);
        await this.doorsService.create(createDoorDto).catch((err) => {
            console.log(err);
            return err;
        });
        response.setHeader('Content-Type', 'application/octet-stream');
        response.setHeader('Content-Disposition', 'attachment; filename="setup.zip"');
        return new common_1.StreamableFile(await zip.generateAsync({ type: 'nodebuffer' }));
    }
    update(uuid, updateDoorDto) {
        return this.doorsService.update(uuid, updateDoorDto);
    }
    delete(uuid) {
        return this.doorsService.remove(uuid);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoorsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':uuid'),
    __param(0, common_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoorsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_door_dto_1.CreateDoorDto]),
    __metadata("design:returntype", Promise)
], DoorsController.prototype, "create", null);
__decorate([
    common_1.Patch(':uuid'),
    __param(0, common_1.Param('uuid')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_door_dto_1.UpdateDoorDto]),
    __metadata("design:returntype", void 0)
], DoorsController.prototype, "update", null);
__decorate([
    common_1.Delete(':uuid'),
    __param(0, common_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoorsController.prototype, "delete", null);
DoorsController = __decorate([
    common_1.Controller('doors'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [doors_service_1.DoorsService])
], DoorsController);
exports.DoorsController = DoorsController;
//# sourceMappingURL=doors.controller.js.map