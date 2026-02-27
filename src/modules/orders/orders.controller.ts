import { Controller, Post, Get, UseGuards, Query, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/orderResponse.dto.';
import { GetOrderResponseDto } from './dto/getOrderResponse.dto';
import { GetOrdersDto } from './dto/getOrders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addOrder(@GetUser('id') userId: number) {
    const order = await this.ordersService.addOrder(userId);

    return plainToInstance(OrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }

  @Get('my-orders')
  @Roles('client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMyOrdersByStatus(
    @GetUser('id') userId: number,
    @Query() query: GetOrdersDto,
  ): Promise<GetOrderResponseDto[]> {
    const orderUser = await this.ordersService.getMyOrderByStatus(
      userId,
      query.status,
    );

    return plainToInstance(GetOrderResponseDto, orderUser, {
      excludeExtraneousValues: true,
    });
  }

  @Get('order-id/:orderId')
  @Roles('client', 'root', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrderById(
    @GetUser('id') userId: number,
    @Param('orderId') orderId: number,
  ): Promise<GetOrderResponseDto> {
    const order = await this.ordersService.getOrderById(userId, orderId);

    return plainToInstance(GetOrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }

  @Get('orders-status')
  @Roles('root', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrdersByStatus(
    @Query() query: GetOrdersDto,
  ): Promise<GetOrderResponseDto[]> {
    const orders = await this.ordersService.getOrdersByStatus(query.status);

    return plainToInstance(GetOrderResponseDto, orders, {
      excludeExtraneousValues: true,
    });
  }
}
