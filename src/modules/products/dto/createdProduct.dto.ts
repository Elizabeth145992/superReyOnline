import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatedProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  stockBox: number;

  @IsNumber()
  @IsOptional()
  stockUnit: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
