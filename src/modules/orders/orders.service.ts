import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartsService } from '../carts/carts.service';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ItemsCartService } from '../items-cart/items-cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    private readonly cartsService: CartsService,
    private readonly itemsCartService: ItemsCartService,
  ) {}

  async addOrder(userId: number) {
    const cart = await this.cartsService.getActiveCartByUserId(userId);

    if (!cart || cart.itemsCart.length == 0) {
      throw new BadRequestException('AddOrder: cart is empty');
    }

    let total = 0;

    const itemsOrder = cart.itemsCart.map((item) => {
      if (item.quantityBox && item.quantityBox > 0) {
        total += item.product.priceBox * item.quantityBox;
      }
      if (item.quantityUnit && item.quantityUnit > 0) {
        total += item.product.priceUnit * item.quantityUnit;
      }

      return this.orderItemsRepository.create({
        product: item.product,
        quantityBox: item.quantityBox,
        quantityUnit: item.quantityUnit,
        priceBox: item.product.priceBox,
        priceUnit: item.product.priceUnit,
      });
    });

    const order = this.ordersRepository.create({
      user: { id: userId },
      items: itemsOrder,
      total,
    });

    const orderCreated = await this.ordersRepository.save(order);
    cart.active = false;

    await this.cartsService.saveCart(cart);

    await this.itemsCartService.removeItemsCart(cart.id);

    return orderCreated;
  }
}
