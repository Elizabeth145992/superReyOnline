import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('order-item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  quantityBox: number;

  @Column({ nullable: true, default: null })
  quantityUnit: number;

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

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
