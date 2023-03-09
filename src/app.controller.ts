import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    console.log(this.configService.get<string>('port'));
    const { phone, password } = createUserDto;
    const token = await this.authService.login({ phone, password });
    return token;
  }

  @Post('/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: number }> {
    const { phone, password } = createUserDto;
    const existingUser = await this.userService.findOne(phone);
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException('手机号已被注册');
    }
    const user = await this.userService.create(phone, password);
    console.log(user);
    return { id: user.id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('login')
  getUserInfo(@Req() req) {
    return req.user;
  }

}
