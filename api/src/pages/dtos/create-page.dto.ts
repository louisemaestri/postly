import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePageDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsUUID('all')
    planId: string;
}