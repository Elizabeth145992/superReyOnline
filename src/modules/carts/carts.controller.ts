import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddItemToCart } from './dto/addItemtoCart.dto';
import { CartResponseDto } from './dto/cartResponse.dto';
import { UpdateitemResponseDto } from './dto/updateitemResponse.dto.';
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

  @Patch('items/:productid')
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateItemQuantity(
    @GetUser('id') userId: number,
    @Param('productid') productId: number,
    @Body()
    body: {
      quantityBox?: number | null;
      quantityUnit?: number | null;
    },
  ) {
    const item = await this.cartsService.updateItemQuantity(
      userId,
      productId,
      body?.quantityUnit || null,
      body?.quantityBox || null,
    );

    return plainToInstance(UpdateitemResponseDto, item, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('items/:productid')
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeItemFromCart(
    @GetUser('id') userId: number,
    @Param('productid') productId: number,
  ) {
    return this.cartsService.updateItemQuantity(userId, productId, 0, 0);
  }
}
