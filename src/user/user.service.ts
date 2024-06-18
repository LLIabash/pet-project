import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserdto } from './interfaces/dto/createUser-dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userID: string): Promise<User> {
        const user = await this.userModel
            .findById(userID)
            .exec();
        return user;
    }

    async addUser(createUserDTO: CreateUserdto): Promise<User> {
        const newUser = await new this.userModel(createUserDTO);
        return newUser.save();
    }

    async editUser(userID: string, createUserDTO: CreateUserdto): Promise<User> {
        const editedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true });
        return editedUser;
    }

    async deleteUser(userID: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(userID);
    return deletedUser;
}
}