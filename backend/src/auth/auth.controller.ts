import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    console.log('AuthController - Login request received');
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: { email: string; password: string; pseudo: string }) {
    console.log('AuthController - Register request received');
    
    // Validation basique
    if (!registerDto.email || !registerDto.password || !registerDto.pseudo) {
      throw new BadRequestException('Tous les champs sont requis');
    }
    
    if (registerDto.password.length < 6) {
      throw new BadRequestException('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    try {
      const user = await this.authService.register(registerDto);
      console.log('Registration successful for:', registerDto.email);
      return this.authService.login(user);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'P2002') {
        throw new BadRequestException('Cet email est déjà utilisé');
      }
      throw new BadRequestException('Erreur lors de l\'inscription');
    }
  }
}
