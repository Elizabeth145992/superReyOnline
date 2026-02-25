import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCart } from './entities/item-cart.entity';

@Injectable()
export class ItemsCartService {
  constructor(
    @InjectRepository(ItemCart)
    private readonly itemsCartRepository: Repository<ItemCart>,
  ) {}

  async createItemCart(itemCartData: Partial<ItemCart>): Promise<ItemCart> {
    const itemCart = this.itemsCartRepository.create(itemCartData);
    return this.itemsCartRepository.save(itemCart);
  }

  async updateItemCart(
    quantityBox: number | null,
    quantityUnit: number | null,
    itemId: number,
  ): Promise<ItemCart | null> {
    const quantities = {};
    if (quantityBox !== null) {
      quantities['quantityBox'] = quantityBox;
    }
    if (quantityUnit !== null) {
      quantities['quantityUnit'] = quantityUnit;
    }
    return this.itemsCartRepository
      .update(itemId, quantities)
      .then(() => this.itemsCartRepository.findOneBy({ id: itemId }));
  }

  async removeItemCart(item: ItemCart): Promise<void> {
    await this.itemsCartRepository.remove(item);
  }

  async saveItemCart(item: ItemCart): Promise<void> {
    await this.itemsCartRepository.save(item);
  }

  async removeItemsCart(idCart: number, managerDB?: EntityManager) {
    const manager = managerDB
      ? managerDB.getRepository(ItemCart)
      : this.itemsCartRepository;
    await manager.delete({
      cart: { id: idCart },
    });
  }
}
