import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestUserDto {
    @IsString()
    @ApiProperty()
    userId: string;

    @IsString()
    @ApiProperty()
    username: string;
  }
