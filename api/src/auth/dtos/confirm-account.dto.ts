import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountDto {
    @IsString()
    @ApiProperty()
    token: string;
  }
