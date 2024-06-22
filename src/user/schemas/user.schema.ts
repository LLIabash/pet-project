import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class CartItem {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;

    @Prop({ required: true, min: 1, default: 1 })
    count: number;
}

const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class User {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, trim: true, lowercase: true, unique: true })
    mail: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ type: [CartItemSchema], default: [] })
    cart: CartItem[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
