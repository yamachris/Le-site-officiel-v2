import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService - Validating user:', email);
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      console.log('AuthService - User not found');
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    console.log('AuthService - Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    console.log('AuthService - Generating JWT for user:', user.email);
    const payload = { sub: user.id, email: user.email };
    
    return {
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        premium: user.premium || false,
        unitos: user.unitos || 0,
        scoreElo: user.scoreElo || 1000,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new UnauthorizedException('Cet email est déjà utilisé');
    }

    const hashedPassword = await argon2.hash(userData.password);
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
      premium: false,
      unitos: 0,
      scoreElo: 1000,
    });

    const { password: _, ...result } = user;
    return this.login(result);
  }
}
