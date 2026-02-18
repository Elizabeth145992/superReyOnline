import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UsersService } from '../users/users.service';
import { CategoryProductsService } from '../category-products/category-products.service';
import { CreatedProductDto } from './dto/createdProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private usersService: UsersService,
    private categoryProductsService: CategoryProductsService,
  ) {}

  async createProduct(
    productData: CreatedProductDto,
    userId: number,
  ): Promise<Product> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const category = await this.categoryProductsService.getCategoryById(
      productData.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productsRepository.create(productData);
    return this.productsRepository.save({
      ...product,
      name: productData.name.trim(),
      categoryProduct: category,
    });
  }

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        active: true,
      },
      relations: ['categoryProduct'],
      select: [
        'id',
        'name',
        'description',
        'priceUnit',
        'priceBox',
        'stockBox',
        'stockUnit',
        'imageUrl',
        'categoryProduct',
      ],
    });
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }
}
