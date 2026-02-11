import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from './cartResponse.dto';

export class UpdateitemResponseDto {
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @Expose()
  quantityUnit: number | null;

  @Expose()
  quantityBox: number | null;
}
