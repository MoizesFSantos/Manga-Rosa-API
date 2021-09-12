import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  //http://localhost/users
  // @Get()
  // getAllUsers(): User[] {
  //   //return this.usersService.getAllUsers();
  // }
  //http://localhost/users/(id)
  @Get('/:id')
  GetUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
  //http://localhost/users
  @Post()
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
  // //http://localhost/users/(id)
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
