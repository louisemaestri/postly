import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequestUserDto } from 'src/auth/dtos/request-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContractsService } from 'src/contracts/contracts.service';
import { CreateContractDto } from 'src/contracts/dtos/create-contract.dto';
import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';
@ApiTags('pages')
@Controller('pages')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly contractsService: ContractsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Page' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createPageDto: CreatePageDto, @User() currentUser: RequestUserDto): Promise<Page> {
    const createContractDto = new CreateContractDto();
    createContractDto.planId = createPageDto.planId;
    createContractDto.ownerId = currentUser.userId;

    const contract = await this.contractsService.create(createContractDto);

    return this.pagesService.create(contract.id, createPageDto);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Page' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto): Promise<Page> {
    return this.pagesService.update(id, updatePageDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Get Pages' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Page[]> {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Page' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Page> {
    return this.pagesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Page' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.pagesService.remove(id);
  }
}