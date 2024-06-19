import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserdto } from './interfaces/dto/createUser-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUser(userID: string): Promise<User> {
    return await this.userModel.findById(userID).exec();
  }

  async addUser(createUserDTO: CreateUserdto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const newUser = new this.userModel({
      ...createUserDTO,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async editUser(userID: string, createUserDTO: CreateUserdto): Promise<User> {
    if (createUserDTO.password) {
      createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
    }
    return await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true }).exec();
  }

  async deleteUser(userID: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(userID).exec();
  }
}