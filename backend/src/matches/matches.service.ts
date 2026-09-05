import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const match = await this.prisma.match.create({
      data: createMatchDto,
      include: {
        player1: true,
        player2: true,
      },
    });

    // Mise à jour des scores Elo
    if (match.resultat === 'player1') {
      await this.updateEloScores(match.player1Id, match.player2Id, 1);
    } else if (match.resultat === 'player2') {
      await this.updateEloScores(match.player2Id, match.player1Id, 1);
    }

    return match;
  }

  async findAll() {
    return this.prisma.match.findMany({
      include: {
        player1: {
          select: {
            id: true,
            pseudo: true,
            scoreElo: true,
          },
        },
        player2: {
          select: {
            id: true,
            pseudo: true,
            scoreElo: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        player1: true,
        player2: true,
      },
    });
  }

  async findUserMatches(userId: number) {
    return this.prisma.match.findMany({
      where: {
        OR: [
          { player1Id: userId },
          { player2Id: userId },
        ],
      },
      include: {
        player1: {
          select: {
            id: true,
            pseudo: true,
            scoreElo: true,
          },
        },
        player2: {
          select: {
            id: true,
            pseudo: true,
            scoreElo: true,
          },
        },
      },
    });
  }

  private async updateEloScores(winnerId: number, loserId: number, kFactor: number = 32) {
    const winner = await this.usersService.findOne(winnerId);
    const loser = await this.usersService.findOne(loserId);

    const expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.scoreElo - winner.scoreElo) / 400));
    const expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.scoreElo - loser.scoreElo) / 400));

    const newWinnerElo = Math.round(winner.scoreElo + kFactor * (1 - expectedScoreWinner));
    const newLoserElo = Math.round(loser.scoreElo + kFactor * (0 - expectedScoreLoser));

    await this.usersService.updateElo(winnerId, newWinnerElo);
    await this.usersService.updateElo(loserId, newLoserElo);
  }
}
