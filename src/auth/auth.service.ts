import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    console.log(user, 'user');
    const token = this.createToken({
      id: user.id,
      phone: user.phone,
      role: user.role,
    });

    return { token };
  }
}
