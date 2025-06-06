import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // TODO add a better logic to handle exceptions
    if (!user) throw new UnauthorizedException();
    // TODO: use a library like bcrypt or something with a salted one-way hash algorithm.
    // Compare the stored password to a hashed version of the incoming password
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
