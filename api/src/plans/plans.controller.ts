import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { Plan } from './entities/plan.entity';
import { PlansService } from './plans.service';

@ApiTags('plans')
@Controller('plans')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create Plan' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Plans' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Plan' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Plan> {
    return this.plansService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Plan' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.plansService.remove(id);
  }
}