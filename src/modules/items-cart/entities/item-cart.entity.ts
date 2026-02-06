import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('item-cart')
export class ItemCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itemsCart, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ nullable: true, default: null })
  quantityBox: number;

  @Column({ nullable: true, default: null })
  quantityUnit: number;
}
