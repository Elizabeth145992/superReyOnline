import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddItemToCart } from './dto/addItemtoCart.dto';
import { CartResponseDto } from './dto/cartResponse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { plainToInstance } from 'class-transformer';

@Controller('carts')
@UseInterceptors(ClassSerializerInterceptor)
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post()
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addItemToCart(
    @GetUser('id') userId: number,
    @Body() itemData: AddItemToCart,
  ): Promise<CartResponseDto> {
    const cart = await this.cartsService.addItemInCart(
      userId,
      itemData.productId,
      itemData.quantityBox ?? null,
      itemData.quantityUnit ?? null,
    );

    return plainToInstance(CartResponseDto, cart, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getActiveCartByUserId(
    @GetUser('id') userId: number,
  ): Promise<CartResponseDto> {
    const cart = await this.cartsService.getActiveCartByUserId(userId);

    return plainToInstance(CartResponseDto, cart, {
      excludeExtraneousValues: true,
    });
  }
}
