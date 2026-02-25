import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatedProductDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string =>
    typeof value === 'string' ? value.trim() : value,
  )
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  priceUnit: number;

  @IsNotEmpty()
  @IsNumber()
  priceBox: number;

  @IsNumber()
  @IsOptional()
  stockBox: number;

  @IsNumber()
  @IsOptional()
  stockUnit: number;

  @IsNumber()
  @IsOptional()
  productByBox: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
