import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserSchema, User } from 'src/user/schemas/user.schema';
import { Product, ProductSchema, ProductDocument } from 'src/products/schemas/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}