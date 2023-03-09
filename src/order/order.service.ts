import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) { }
  
  create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    order.user_id = createOrderDto.user_id;
    order.order_detail = createOrderDto.order_detail;
    return this.orderRepository.save(order)
  }

  findAll() {
    return this.orderRepository.find();
  }

  remove(id: number) {
    return this.orderRepository.createQueryBuilder().softDelete().where("order_id = :id", { id }).execute();
  }
}
