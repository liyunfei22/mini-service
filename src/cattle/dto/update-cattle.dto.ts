import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCattleDto } from './create-cattle.dto';

export class UpdateCattleDto extends PartialType(CreateCattleDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;
}
