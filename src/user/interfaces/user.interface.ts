import { Document, Types } from "mongoose";

export interface User extends Document {
    readonly name: string,
    readonly mail: string,
    readonly password: string,
    cart: {
        product: Types.ObjectId; 
        count: number;
      }[];
}