import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const allUsers = await this.UserRepository.find();

    return allUsers;
  }

  async findOne(phone: string): Promise<User | undefined> {
    return this.UserRepository.findOne({
      where: { phone },
    });
  }

  async validateUser(phone: string, password: string): Promise<User | null> {
    const user = await this.findOne(phone);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async create(phone: string, password: string): Promise<User> {
    const user = new User();
    user.phone = phone;
    user.password = password;
    return this.UserRepository.save(user);
  }
}
