import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';
import { CategoryProductsModule } from '../category-products/category-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UsersModule,
    CategoryProductsModule,
  ],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
