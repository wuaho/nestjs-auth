import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;

    // TODO: use a library like bcrypt or something with a salted one-way hash algorithm.
    // Compare the stored password to a hashed version of the incoming password
    if (user.password !== password) return null;

    const { password: _, ...result } = user;

    return result;
  }

  // TODO: provide a better type for the user like Omit<User, 'password'>
  async signIn(user: any): Promise<{ access_token: string }> {
    const payload = { sub: user.userId, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
