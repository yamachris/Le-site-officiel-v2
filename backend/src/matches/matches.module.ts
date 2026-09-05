import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [MatchesService, PrismaService, UsersService],
  controllers: [MatchesController],
  exports: [MatchesService],
})
export class MatchesModule {}
