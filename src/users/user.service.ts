import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserConhecimento } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // getAllUsers() {
  //   return this.users;
  // }
  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `Usuario com o ID "${id}" não foi encontrado`,
      );
    }
    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { nome, email, cpf, celular, valido } = createUserDto;

    const user = this.userRepository.create({
      nome,
      email,
      cpf,
      celular,
      conhecimento: UserConhecimento.GIT,
      valido,
    });
    //salvando o usuario criado no DB
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario com o ID "${id}" nao encontrado`);
    }
  }
}
