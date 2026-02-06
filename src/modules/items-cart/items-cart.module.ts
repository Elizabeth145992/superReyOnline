import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsCartService } from './items-cart.service';
import { ItemCart } from './entities/item-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCart])],
  providers: [ItemsCartService],
  exports: [ItemsCartService],
})
export class ItemsCartModule {}
