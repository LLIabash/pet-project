import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from "./../user/schemas/user.schema"
import { Product, ProductDocument } from './../products/schemas/product.schema';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    // Метод для добавления товара в корзину
    async addItemToCart(userId: string, productId: string, count: number): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        // Проверка, что добавляемое количество не превышает доступное количество
        const cartItem = user.cart.find(item => item.product.toString() === productId);
        const totalQuantity = cartItem ? cartItem.count + count : count;

        if (totalQuantity > product.count) {
            throw new BadRequestException(`Cannot add more than ${product.count} items of this product.`);
        }

        if (cartItem) {
            cartItem.count += count;
        } else {
            user.cart.push({ product: new Types.ObjectId(productId), count });
        }

        return user.save();
    }

    // Метод для обновления количества товара в корзине
    async updateQuantity(userId: string, productId: string, count: number): Promise<UserDocument | null> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        if (count > product.count) {
            throw new BadRequestException(`Cannot set quantity more than ${product.count}.`);
        }

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (!cartItem) {
            throw new NotFoundException('Product not found in cart.');
        }

        cartItem.count = count;
        return user.save();
    }

    // Метод для удаления товара из корзины
    async removeItem(userId: string, productId: string): Promise<UserDocument | null> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const initialCartLength = user.cart.length;
        user.cart = user.cart.filter(item => item.product.toString() !== productId);

        if (user.cart.length === initialCartLength) {
            return null;
        }
        return user.save();
    }
}