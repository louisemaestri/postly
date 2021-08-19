import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './entities/plan.entity';
import { PlansService } from './plans.service';

@Module({
  imports: [SequelizeModule.forFeature([Plan])],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
