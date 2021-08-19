import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsJSON, IsUUID } from 'class-validator';

export class UpdatePageDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    favicon: string;

    @ApiProperty()
    @IsJSON()
    theme: JSON;

    @ApiProperty()
    @IsJSON()
    modifiers
}