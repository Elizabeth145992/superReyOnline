import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { VALID_ORDER_STATUSES } from '../../../configs/statusEnums';

export class GetOrdersDto {
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsIn(VALID_ORDER_STATUSES)
  status: number;
}
