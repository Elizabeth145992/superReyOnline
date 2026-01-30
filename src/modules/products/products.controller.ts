import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreatedProductDto } from './dto/createdProduct.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Roles('admin', 'root')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createProduct(
    @GetUser('id') userId: number,
    @Body() productData: CreatedProductDto,
  ) {
    return this.productsService.createProduct(productData, userId);
  }

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }
}
