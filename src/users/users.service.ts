import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity (e.g. TypeORM, Sequelize, Mongoose, etc)
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@gmail.com',
      username: 'john',
      password: 'superclock323',
    },
    {
      userId: 2,
      email: 'maria@gmail.com',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
