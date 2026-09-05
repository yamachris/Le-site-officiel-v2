import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: { username: string; password: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { username: loginDto.username },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(admin.password, loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: admin.id, 
      username: admin.username,
      role: admin.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getDashboardData() {
    const userCount = await this.prisma.user.count();
    const matchCount = await this.prisma.match.count();
    const premiumUsersCount = await this.prisma.premiumSubscription.count({
      where: { status: 'actif' },
    });

    return {
      totalUsers: userCount,
      totalMatches: matchCount,
      premiumUsers: premiumUsersCount,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        pseudo: true,
        email: true,
        scoreElo: true,
        dateInscription: true,
      },
      orderBy: {
        dateInscription: 'desc',
      },
    });

    return {
      total: users.length,
      users: users,
    };
  }

  async listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        pseudo: true,
        email: true,
        scoreElo: true,
        dateInscription: true,
      },
      orderBy: {
        dateInscription: 'desc',
      },
    });
  }
}
