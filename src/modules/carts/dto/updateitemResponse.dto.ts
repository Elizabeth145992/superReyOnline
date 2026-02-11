import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from './cartResponse.dto';

export class UpdateItemResponseDto {
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @Expose()
  quantityUnit: number | null;

  @Expose()
  quantityBox: number | null;
}
