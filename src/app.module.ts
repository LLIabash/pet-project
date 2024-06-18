import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/beta_project'),
  UserModule
  ],
})
export class AppModule {}
