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
exports.FingersController = void 0;
const common_1 = require("@nestjs/common");
const fingers_service_1 = require("./fingers.service");
const create_finger_entity_1 = require("./dto/create-finger.entity");
const microservices_1 = require("@nestjs/microservices");
let FingersController = class FingersController {
    constructor(fingersService, client) {
        this.fingersService = fingersService;
        this.client = client;
        client.connect();
    }
    async create(createFingerDto) {
        const sessionId = await this.fingersService.create(createFingerDto);
        console.log(sessionId);
        this.client.emit('ENROLL', {
            run: true,
        });
        return sessionId;
    }
    match(body) {
        return 'success';
    }
    remove(userId) {
        return this.fingersService.remove(userId);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_finger_entity_1.CreateFingerDto]),
    __metadata("design:returntype", Promise)
], FingersController.prototype, "create", null);
__decorate([
    common_1.Post('/match/:userId'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "match", null);
__decorate([
    common_1.Delete(':userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "remove", null);
FingersController = __decorate([
    common_1.Controller('fingers'),
    __param(1, common_1.Inject('MQ_CLIENT')),
    __metadata("design:paramtypes", [fingers_service_1.FingersService,
        microservices_1.ClientProxy])
], FingersController);
exports.FingersController = FingersController;
//# sourceMappingURL=fingers.controller.js.map