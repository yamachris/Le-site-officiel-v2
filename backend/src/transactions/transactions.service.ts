import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: createTransactionDto,
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        user: {
          select: {
            id: true,
            pseudo: true,
            email: true,
          },
        },
      },
    });
  }

  async findUserTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        dateTransaction: 'desc',
      },
    });
  }

  async createPremiumSubscription(userId: number) {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Abonnement d'un mois

    // Créer la transaction
    await this.create({
      userId,
      montant: 9.99, // Prix de l'abonnement premium
      typeAchat: 'PREMIUM_SUBSCRIPTION',
    });

    // Créer ou mettre à jour l'abonnement premium
    return this.prisma.premiumSubscription.upsert({
      where: {
        userId,
      },
      update: {
        dateFin: endDate,
        status: 'actif',
      },
      create: {
        userId,
        dateFin: endDate,
        status: 'actif',
      },
    });
  }

  async cancelPremiumSubscription(userId: number) {
    return this.prisma.premiumSubscription.update({
      where: {
        userId,
      },
      data: {
        status: 'inactif',
      },
    });
  }
}
