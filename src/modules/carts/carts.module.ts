import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ItemsCartModule } from '../items-cart/items-cart.module';
import { CartsController } from './carts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    UsersModule,
    ProductsModule,
    ItemsCartModule,
  ],
  providers: [CartsService],
  exports: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
