import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
    private readonly usersService: UsersService,
  ) {}

  async createAddress(
    addressData: Partial<Address>,
    userId: number,
  ): Promise<Address> {
    const user = await this.usersService.findById(userId);

    if (!user) throw new UnauthorizedException('User not found');

    const address = this.addressesRepository.create({
      ...addressData,
      user,
    });

    return this.addressesRepository.save(address);
  }

  async getAddressByUser(userId: number): Promise<Address[]> {
    const address = await this.addressesRepository.find({
      where: {
        user: { id: userId },
      },
    });

    return address;
  }
}
