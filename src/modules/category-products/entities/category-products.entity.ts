import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category_products')
export class CategoryProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoryName: string;

  @Column({ default: true })
  active: boolean;
}
