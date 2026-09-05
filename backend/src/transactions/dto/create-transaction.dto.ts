import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  montant: number;

  @IsString()
  typeAchat: string;
}
