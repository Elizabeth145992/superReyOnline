import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoryProductsModule } from './modules/category-products/category-products.module';
import { CartsModule } from './modules/carts/carts.module';
import { ItemsCartModule } from './modules/items-cart/items-cart.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, //Solo true para desarrollo
      }),
    }),

    RolesModule,

    AddressesModule,

    UsersModule,

    AuthModule,

    ProductsModule,

    CategoryProductsModule,

    CartsModule,

    ItemsCartModule,

    OrdersModule,

    OrderItemsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    const status = this.dataSource.isInitialized ? 'conectada' : 'fallida';
    console.log(`La base de datos está ${status}`);
  }
}
