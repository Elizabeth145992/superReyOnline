import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProducts } from './entities/category-products.entity';

@Injectable()
export class CategoryProductsService {
  constructor(
    @InjectRepository(CategoryProducts)
    private readonly categoryProductsRepository: Repository<CategoryProducts>,
  ) {}

  async getCategoryById(id: number): Promise<CategoryProducts | null> {
    return this.categoryProductsRepository.findOneBy({ id });
  }

  async getAllCategories(): Promise<CategoryProducts[]> {
    return this.categoryProductsRepository.find({ where: { active: true } });
  }
}
