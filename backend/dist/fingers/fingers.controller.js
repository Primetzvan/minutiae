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
const constants_1 = require("../auth/constants");
let FingersController = class FingersController {
    findOne(user_id) {
        return `This action returns the id of the finger`;
    }
    create(fingerId) {
        return fingerId;
    }
    match(body) {
        return 'success';
    }
    remove(user_id) {
        return `This action removes the finger finger of user ${user_id}`;
    }
};
__decorate([
    common_1.Get(':user_id'),
    __param(0, common_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "findOne", null);
__decorate([
    common_1.Post(':userId'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "create", null);
__decorate([
    constants_1.Public(),
    common_1.Post('/match/:userId'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "match", null);
__decorate([
    common_1.Delete(':userId'),
    __param(0, common_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FingersController.prototype, "remove", null);
FingersController = __decorate([
    common_1.Controller('fingers')
], FingersController);
exports.FingersController = FingersController;
//# sourceMappingURL=fingers.controller.js.map