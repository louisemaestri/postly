import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsInt, IsBoolean } from 'class-validator';

export class CreateContractDto {
    @ApiProperty()
    @IsUUID('all')
    ownerId: string;

    @ApiProperty()
    @IsString()
    planId: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    pageId?: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    expiresIn = 1

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    autoRenew = false
}