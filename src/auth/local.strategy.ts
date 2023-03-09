import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.userService.findOne(phone);
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }
    return user;
  }
}
