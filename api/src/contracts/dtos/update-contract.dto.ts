import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDecimal, IsDate, IsJSON } from 'class-validator';

export class UpdateContractDto {
    @ApiProperty()
    @IsString()
    planId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDecimal()
    price: number;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsDate()
    expiresIn: Date;

    @ApiProperty()
    @IsDate()
    renewIn: Date;

    @ApiProperty()
    @IsBoolean()
    autoRenew: boolean;

    @ApiProperty()
    @IsJSON()
    planContent: any;
}