import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBeefDto } from './create-beef.dto';

export class UpdateBeefDto extends PartialType(CreateBeefDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;
}
