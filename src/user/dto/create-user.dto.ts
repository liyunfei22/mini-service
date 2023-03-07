import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
console.log('CreateUserDto');
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Transform(({ value }) => value.toString())
  password: string;
}
