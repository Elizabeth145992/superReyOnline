import { IsString, IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    numberHouse: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;
}