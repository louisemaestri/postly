import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateContractDto } from './dtos/create-contract.dto';
import { Contract } from './entities/contract.entity';
import { ContractsService } from './contracts.service';

@ApiTags('contracts')
@Controller('contracts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ContractsController {
  constructor(private readonly linksService: ContractsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Contract' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.linksService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Contracts' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Contract[]> {
    return this.linksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Contract' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Contract> {
    return this.linksService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Contract' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.linksService.remove(id);
  }
}