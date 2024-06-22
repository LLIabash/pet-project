import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProductModule } from 'src/products/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        ProductModule,
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}