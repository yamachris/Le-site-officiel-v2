import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChatLogDto } from './dto/create-chat-log.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createChatLogDto: CreateChatLogDto) {
    return this.prisma.chatLog.create({
      data: createChatLogDto,
    });
  }

  async findAll() {
    return this.prisma.chatLog.findMany({
      include: {
        user: {
          select: {
            id: true,
            pseudo: true,
          },
        },
      },
    });
  }

  async findUserChats(userId: number) {
    return this.prisma.chatLog.findMany({
      where: {
        userId,
      },
      orderBy: {
        dateMessage: 'desc',
      },
    });
  }

  async processGPTMessage(userId: number, message: string) {
    // Ici, vous devrez implémenter l'intégration avec l'API GPT
    // Pour l'instant, nous retournons une réponse simulée
    const response = "Je suis désolé, l'intégration GPT n'est pas encore implémentée.";
    
    await this.create({
      userId,
      message,
      typeMessage: 'user',
    });

    await this.create({
      userId,
      message: response,
      typeMessage: 'chatbot',
    });

    return response;
  }
}
