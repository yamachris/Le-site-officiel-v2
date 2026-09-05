import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatLogDto } from './dto/create-chat-log.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatLogDto: CreateChatLogDto) {
    return this.chatService.create(createChatLogDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get('user/:userId')
  findUserChats(@Param('userId') userId: string) {
    return this.chatService.findUserChats(+userId);
  }

  @Post('gpt')
  async processGPTMessage(
    @Body('userId') userId: number,
    @Body('message') message: string,
  ) {
    return this.chatService.processGPTMessage(userId, message);
  }
}
