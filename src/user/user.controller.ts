import {
  Controller,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
