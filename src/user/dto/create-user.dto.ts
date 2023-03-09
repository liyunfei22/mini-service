import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Transform(({ value }) => value.toString())
  password: string;
}
