import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

interface Detail {
  [key: string]: string;
}

export class CreateOrderDto {

  @ApiProperty()
  @IsNotEmpty({
    message: 'user_id is required'
  })
  readonly user_id: string;
  @ApiProperty()
  @IsNotEmpty({
    message: 'order_detail is required'
  })
  readonly order_detail: Detail;
}
