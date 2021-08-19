import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlanDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    price: number;
}