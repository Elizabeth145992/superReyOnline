import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { CartsModule } from '../carts/carts.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ItemsCartModule } from '../items-cart/items-cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CartsModule,
    OrderItemsModule,
    ItemsCartModule,
  ],
  providers: [OrdersService],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
