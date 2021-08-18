"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRefactor1628750682147 = void 0;
class UserRefactor1628750682147 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO user ("username", "role", "password") VALUE ("Heinz", "Admin", "geheim")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM user where username="Heinz"`);
    }
}
exports.UserRefactor1628750682147 = UserRefactor1628750682147;
//# sourceMappingURL=1628750682147-UserRefactor.js.map