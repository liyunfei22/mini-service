import { IsNotEmpty } from 'class-validator';

interface Detail {
  [key: string]: string;
}

export class CreateOrderDto {

  @IsNotEmpty({
    message: 'user_id is required'
  })
  readonly user_id: string;

  @IsNotEmpty({
    message: 'order_detail is required'
  })
  readonly order_detail: Detail;
}
