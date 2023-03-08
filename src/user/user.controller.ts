import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<{ id: number }> {
    console.log(this.configService.get<string>('port'));
    const { phone, password } = createUserDto;
    const user = await this.userService.validateUser(phone, password);
    if (!user) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    return { id: user.id };
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
}
