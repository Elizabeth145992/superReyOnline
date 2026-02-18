import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoryProducts } from '../../category-products/entities/category-products.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceUnit: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceBox: number;

  @Column({ nullable: true, default: null })
  stockBox: number;

  @Column({ nullable: true, default: null })
  stockUnit: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;

  @Column()
  imageUrl: string;

  @ManyToOne(() => CategoryProducts)
  @JoinColumn({ name: 'categoryProduct' })
  categoryProduct: CategoryProducts;
}
