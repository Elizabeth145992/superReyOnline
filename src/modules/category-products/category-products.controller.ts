import { Controller, Get } from '@nestjs/common';
import { CategoryProductsService } from './category-products.service';

@Controller('category-products')
export class CategoryProductsController {
  constructor(private categoryProductsService: CategoryProductsService) {}

  @Get()
  async getAllCategories() {
    return this.categoryProductsService.getAllCategories();
  }
}
