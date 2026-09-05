import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('user/:userId')
  findUserTransactions(@Param('userId') userId: string) {
    return this.transactionsService.findUserTransactions(+userId);
  }

  @Post('premium/subscribe/:userId')
  subscribePremium(@Param('userId') userId: string) {
    return this.transactionsService.createPremiumSubscription(+userId);
  }

  @Post('premium/cancel/:userId')
  cancelPremium(@Param('userId') userId: string) {
    return this.transactionsService.cancelPremiumSubscription(+userId);
  }
}
