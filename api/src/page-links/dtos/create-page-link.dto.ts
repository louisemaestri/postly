import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt } from 'class-validator';
import { PageLinkContext } from '../entities/page-link.entity';

export class CreatePageLinkDto {
    @ApiProperty()
    @IsUUID()
    pageId: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsInt()
    position: number;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsString()
    context: PageLinkContext;
}