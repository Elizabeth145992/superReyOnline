import { Expose, Type } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class CartItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  quantityBox: number;

  @Expose()
  quantityUnit: number;

  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;
}

export class CartResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => CartItemResponseDto)
  itemsCart: CartItemResponseDto[];
}
