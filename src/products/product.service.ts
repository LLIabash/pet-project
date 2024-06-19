import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { Productdto } from './interfaces/dto/product-dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products;
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel
            .findById(productID)
            .exec();
        return product;
    }

    async addProduct(productDTO: Productdto): Promise<Product> {
        const newProduct = await new this.productModel(productDTO);
        return newProduct.save();
    }

    async editProduct(productID: string, productDTO: Productdto): Promise<Product> {
        const editedProduct = await this.productModel
            .findByIdAndUpdate(productID, productDTO, { new: true });
        return editedProduct;
    }

    async deleteProduct(productID: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
}
}