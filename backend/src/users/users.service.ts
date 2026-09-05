import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    console.log('UsersService - Finding all users');
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        pseudo: true,
        email: true,
        scoreElo: true,
        dateInscription: true,
      },
    });
    console.log('UsersService - Found users:', users.length);
    return users;
  }

  async findOne(id: number) {
    console.log('UsersService - Finding user by id:', id);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        matchesAsPlayer1: true,
        matchesAsPlayer2: true,
        premiumSub: true,
      },
    });
    console.log('UsersService - User found:', !!user);
    return user;
  }

  async findByEmail(email: string) {
    console.log('UsersService - Finding user by email:', email);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log('UsersService - User found:', !!user);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateElo(id: number, newElo: number) {
    return this.prisma.user.update({
      where: { id },
      data: { scoreElo: newElo },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
