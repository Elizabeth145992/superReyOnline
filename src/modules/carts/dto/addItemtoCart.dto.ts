import {
  IsNumber,
  IsOptional,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAtLeastOneQuantity', async: false })
export class IsAtLeastOneQuantityConstraint implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments) {
    const obj = args.object as AddItemToCart;
    const qBox = obj.quantityBox || 0;
    const qUnit = obj.quantityUnit || 0;

    return qBox > 0 || qUnit > 0;
  }

  defaultMessage() {
    return 'Debes proporcionar al menos una cantidad (quantityBox o quantityUnit) mayor a cero.';
  }
}

export function IsAtLeastOneQuantity(validationOptions?: ValidationOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsAtLeastOneQuantityConstraint,
    });
  };
}

export class AddItemToCart {
  @IsNumber()
  @IsAtLeastOneQuantity()
  productId: number;

  @IsOptional()
  @IsNumber()
  quantityBox?: number;

  @IsOptional()
  @IsNumber()
  quantityUnit?: number;
}
