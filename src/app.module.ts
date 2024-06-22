import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/beta_project'),
  UserModule,
  ProductModule,
  CartModule
  ],
})
export class AppModule {}
