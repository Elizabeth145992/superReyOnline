import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('addresses')
export class AddressesController {
    constructor(
        private addressesService: AddressesService,
    ) {}

    @Post()
    @Roles('client')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createAddress(@GetUser('id') userId: number, @Body() addressData: CreateAddressDto) {
        return this.addressesService.createAddress(addressData, userId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAddressByUser(@GetUser('id') userId: number){
        return this.addressesService.getAddressByUser(userId);
    }
}
