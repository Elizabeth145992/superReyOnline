import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/modules/carts/dto/cartResponse.dto';

export class OrderItemResponseDto {
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

export class OrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}
