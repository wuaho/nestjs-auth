import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req): Promise<{ access_token: string }> {
    return this.authService.signIn(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {
    console.log('Holap esto es el google auth');
  }

  //TODO: i believe that the redirect should be the frontend url right? or should i
  // redirect the frontend from the backend?
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Request() req): Promise<{ access_token: string }> {
    return this.authService.signIn(req.user);
  }

  // TODO: move this method to the users controller
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
