import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service'; 
import { Product } from './interfaces/product.interface'; 
import { Productdto } from './interfaces/dto/product-dto';

@Controller('product') // Controller prefix changed
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all') // GET request for all products
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Get(':id') // GET request for a specific product
  async getProduct(@Param('id') productID: string): Promise<Product> {
    return await this.productService.getProduct(productID);
  }

  @Post('/create') // POST request to create a product
  async addProduct(@Body() createProductDTO: Productdto): Promise<Product> {
    return await this.productService.addProduct(createProductDTO);
  }

  @Put(':id') // PUT request to update a product
  async editProduct(
    @Param('id') productID: string,
    @Body() createProductDTO: Productdto,
  ): Promise<Product> {
    return await this.productService.editProduct(productID, createProductDTO);
  }

  @Delete(':id') // DELETE request to delete a product
  async deleteProduct(@Param('id') productID: string): Promise<any> {
    return await this.productService.deleteProduct(productID);
  }
}