import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { CartsService } from '../carts/carts.service';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ItemsCartService } from '../items-cart/items-cart.service';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cartsService: CartsService,
    private readonly itemsCartService: ItemsCartService,
  ) {}

  async addOrder(userId: number) {
    return await this.dataSource.transaction(async (manager) => {
      const cart = await this.cartsService.getActiveCartByUserId(
        userId,
        manager,
      );

      if (!cart || cart.itemsCart.length == 0) {
        throw new BadRequestException('AddOrder: cart is empty');
      }

      let total = 0;
      const orderItemsToCreate: OrderItem[] = [];

      for (const item of cart.itemsCart) {
        const product = await manager.findOne(Product, {
          where: {
            id: item.product.id,
          },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new NotFoundException('addOrder: Product not found');
        }

        if (item.quantityBox > 0) {
          if (product.stockBox < item.quantityBox) {
            throw new BadRequestException(
              `addOrder: Insufficient stock for ${product.name}`,
            );
          }
          product.stockBox -= item.quantityBox;
          total += item.product.priceBox * item.quantityBox;
        }

        if (item.quantityUnit > 0) {
          if (item.quantityUnit > product.productByBox) {
            throw new BadRequestException(
              `addOrder: The quantity of products per unit is greater than what a box of ${product.name} (${product.productByBox} units)`,
            );
          }

          if (product.stockUnit < item.quantityUnit) {
            if (product.stockBox > 0) {
              product.stockBox -= 1;
              product.stockUnit += product.productByBox;
            } else {
              throw new BadRequestException(
                `Insufficient unit stock for ${product.name}`,
              );
            }
          }
          product.stockUnit -= item.quantityUnit;
          total += item.product.priceUnit * item.quantityUnit;
        }
        await manager.save(product);

        const orderItem = manager.create(OrderItem, {
          product: item.product,
          quantityBox: item.quantityBox,
          quantityUnit: item.quantityUnit,
          priceBox: item.product.priceBox,
          priceUnit: item.product.priceUnit,
        });

        orderItemsToCreate.push(orderItem);
      }

      const order = manager.create(Order, {
        user: { id: userId },
        items: orderItemsToCreate,
        total,
      });

      const orderCreated = await manager.save(order);

      cart.active = false;
      await this.cartsService.saveCart(cart, manager);
      await this.itemsCartService.removeItemsCart(cart.id, manager);

      return orderCreated;
    });
  }
}
