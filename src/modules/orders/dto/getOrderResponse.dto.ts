import { Expose, Type } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  productByBox: number;
}

export class OrderItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  quantityBox: number;

  @Expose()
  quantityUnit: number;

  @Expose()
  priceUnit: number;

  @Expose()
  priceBox: number;

  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;
}

export class GetOrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  total: number;

  @Expose()
  status: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}
