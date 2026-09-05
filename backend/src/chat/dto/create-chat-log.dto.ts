import { IsNumber, IsString } from 'class-validator';

export class CreateChatLogDto {
  @IsNumber()
  userId: number;

  @IsString()
  message: string;

  @IsString()
  typeMessage: string;
}
