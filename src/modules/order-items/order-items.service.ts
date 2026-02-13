import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async addISetItems(orderItems: Partial<OrderItem>[]): Promise<OrderItem[]> {
    const addOrderItems = orderItems.map((item) => {
      return this.orderItemsRepository.create(item);
    });

    return this.orderItemsRepository.save(addOrderItems);
  }
}
