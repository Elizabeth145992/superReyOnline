import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ItemCart } from '../items-cart/entities/item-cart.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { ItemsCartService } from '../items-cart/items-cart.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly userRepository: UsersService,
    private readonly productService: ProductsService,
    private readonly itemsCartService: ItemsCartService,
  ) {}

  async addItemInCart(
    userId: number,
    productId: number,
    quantityBox: number | null,
    quantityUnit: number | null,
  ): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['itemsCart', 'itemsCart.product'],
    });

    if (!cart) {
      const user = await this.userRepository.findById(userId);

      if (!user)
        throw new NotFoundException(
          'Cart service (addItemInCart): User not found',
        );

      cart = this.cartRepository.create({
        user,
        active: true,
        itemsCart: [],
      });
    }

    if (!cart.active) {
      cart.active = true;
    }

    const product = await this.productService.getProductById(productId);

    if (!product)
      throw new NotFoundException(
        'Cart service (addItemInCart): Product not found',
      );

    const existingItem = cart.itemsCart.find(
      (item) => item.product.id === productId,
    );

    const quantityBoxToAdd =
      quantityBox !== null && quantityBox !== 0 ? quantityBox : 0;
    const quantityUnitToAdd =
      quantityUnit !== null && quantityUnit !== 0 ? quantityUnit : 0;

    if (existingItem) {
      existingItem.quantityBox += quantityBoxToAdd;
      existingItem.quantityUnit += quantityUnitToAdd;
      await this.itemsCartService.updateItemCart(
        existingItem.quantityBox,
        existingItem.quantityUnit,
        existingItem.id,
      );
    } else {
      const newItem = await this.itemsCartService.createItemCart({
        product,
        quantityBox: quantityBoxToAdd,
        quantityUnit: quantityUnitToAdd,
      });
      cart.itemsCart.push(newItem);
    }

    return this.cartRepository.save(cart);
  }

  async getActiveCartByUserId(userId: number): Promise<Cart | null> {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new NotFoundException(
        'Cart service (getActiveCartByUserId): User not found',
      );

    const cart = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
        active: true,
      },
      relations: ['itemsCart', 'itemsCart.product'],
    });

    return cart;
  }

  async updateItemQuantity(
    idUser: number,
    productId: number,
    quantityUnit: number | null,
    quantityBox: number | null,
  ): Promise<ItemCart | null | { message: string }> {
    const cart = await this.getActiveCartByUserId(idUser);

    if (!cart) {
      throw new NotFoundException('updateItemQuantity: cart no found');
    }

    const item = cart.itemsCart.find((item) => item.product.id == productId);
    if (!item) {
      throw new NotFoundException('updateItemQuantity: item no found');
    }

    if (quantityBox === 0 && quantityUnit === 0) {
      await this.itemsCartService.removeItemCart(item);
      return {
        message: 'Item remove from cart',
      };
    }

    if (quantityBox !== null) item.quantityBox = quantityBox;
    if (quantityUnit !== null) item.quantityUnit = quantityUnit;

    await this.itemsCartService.saveItemCart(item);
    return item;
  }

  async saveCart(cart: Partial<Cart>) {
    await this.cartRepository.save(cart);
  }
}
