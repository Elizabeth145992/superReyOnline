import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async create(addressData: Partial<Address>): Promise<Address> {
    const address = this.addressesRepository.create(addressData);
    return this.addressesRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressesRepository.find();
  }

  async findOne(id: number): Promise<Address | null> {
    return this.addressesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateData: Partial<Address>,
  ): Promise<Address | null> {
    const address = await this.addressesRepository.findOneBy({ id });
    return address
      ? this.addressesRepository.save({ ...address, ...updateData })
      : null;
  }

  async findByUserId(userId: number): Promise<Address | null> {
    return this.addressesRepository.findOneBy({ id: userId });
  }
}
