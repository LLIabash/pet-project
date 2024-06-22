import { Controller, Post, Patch, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post(':userId/:productId')
    async addItemToCart(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Body('count') count: number,
    ) {
        if (count < 1) {
            throw new BadRequestException('Count must be greater than zero.');
        }

        const result = await this.cartService.addItemToCart(userId, productId, count);
        if (!result) {
            throw new NotFoundException('Product or user not found.');
        }

        // Популяция для получения имени продукта
        const populatedUser = await result.populate({
            path: 'cart.product',
            select: 'name'
        });

        return { message: 'Product added to cart', cart: populatedUser.cart };
    }

    @Patch(':userId/:productId')
    async updateQuantity(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Body('count') count: number,
    ) {
        if (count < 1) {
            throw new BadRequestException('Count must be greater than zero.');
        }

        const result = await this.cartService.updateQuantity(userId, productId, count);
        if (!result) {
            throw new NotFoundException('Product or user not found.');
        }

        // Популяция для получения имени продукта
        const populatedUser = await result.populate({
            path: 'cart.product',
            select: 'name'
        });

        return { message: 'Product quantity updated', cart: populatedUser.cart };
    }

    @Delete(':userId/:productId')
    async removeItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        const result = await this.cartService.removeItem(userId, productId);
        if (!result) {
            throw new NotFoundException('Product or user not found.');
        }

        // Популяция для получения имени продукта
        const populatedUser = await result.populate({
            path: 'cart.product',
            select: 'name'
        });

        return { message: 'Product removed from cart', cart: populatedUser.cart };
    }
}