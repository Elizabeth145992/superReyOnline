import { Module } from '@nestjs/common';
import { CategoryProductsService } from './category-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProducts } from './entities/category-products.entity';
import { CategoryProductsController } from './category-products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProducts])],
  exports: [CategoryProductsService],
  providers: [CategoryProductsService],
  controllers: [CategoryProductsController],
})
export class CategoryProductsModule {}
