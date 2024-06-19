import { Document } from "mongoose";

export interface Product extends Document {
    readonly name: string,
    readonly description: string;
    readonly photo: string;
    readonly count: number;
}