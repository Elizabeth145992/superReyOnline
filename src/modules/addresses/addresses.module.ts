import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressesController } from './addresses.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    UsersModule
  ],
  providers: [AddressesService],
  exports: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
