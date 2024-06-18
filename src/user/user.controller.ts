import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserdto } from './interfaces/dto/createUser-dto';

@Controller('user') // Определяет префикс маршрута для всех методов контроллера
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all') // GET запрос к users/
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id') // GET запрос к users/:id
  async getUser(@Param('id') userID: string): Promise<User> {
    return await this.userService.getUser(userID);
  }

  @Post('/create') // POST запрос к users/
  async addUser(@Body() createUserDTO: CreateUserdto): Promise<User> {
    return await this.userService.addUser(createUserDTO);
  }

  @Put(':id') // PUT запрос к users/:id
  async editUser(
    @Param('id') userID: string,
    @Body() createUserDTO: CreateUserdto,
  ): Promise<User> {
    return await this.userService.editUser(userID, createUserDTO);
  }

  @Delete(':id') // DELETE запрос к users/:id
  async deleteUser(@Param('id') userID: string): Promise<any> {
    return await this.userService.deleteUser(userID);
  }
}