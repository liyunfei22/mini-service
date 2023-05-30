import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCattleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;
}
