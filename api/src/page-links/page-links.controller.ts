import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePageLinkDto } from './dtos/create-page-link.dto';
import { PageLink } from './entities/page-link.entity';
import { PageLinksService } from './page-links.service';

@ApiTags('page-links')
@Controller('page-links')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PageLinksController {
  constructor(private readonly linksService: PageLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create PageLink' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPageLinkDto: CreatePageLinkDto): Promise<PageLink> {
    return this.linksService.create(createPageLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get PageLinks' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<PageLink[]> {
    return this.linksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get PageLink' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<PageLink> {
    return this.linksService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove PageLink' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.linksService.remove(id);
  }
}