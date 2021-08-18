import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, UserRole } from "../users/entities/user.entity";
import * as moment from 'moment';
import { nanoid } from "nanoid";
import { UpdateUserDto } from "../users/dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameormail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(usernameormail);

    // TODO: nicht plain speichern - statt "pass" einfügen, nicht als variable, wirkft fehler
    //const isValidPassword = await bcrypt.compare(pass, user.password);

    if (user && user.password == pass) {
      if (user.role != UserRole.ADMIN) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.uuid };
    return this.jwtService.sign(payload);
  }

  public async getRefreshToken(user: User): Promise<string> {
    const userDataToUpdate = {
      refreshToken: nanoid(30),
      refreshTokenExp: moment().day(7).format('YYYY/MM/DD'), //expires after one week
    };

    await this.usersService.update(user.username, new UpdateUserDto());
    //await this.user.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validateRefreshToken(username: string, refreshToken: string): Promise<User> {
    const currentDate = moment().format('YYYY/MM/DD');
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    //     {where: {username: user.username, refreshToken: refreshTokenExp: MoreThanOrEqual(currentDate) }}
    if (user.currentHashedRefreshToken == refreshToken) {

    }
    return user;
  }
}
