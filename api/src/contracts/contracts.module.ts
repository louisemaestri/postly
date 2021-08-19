import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from 'src/pages/entities/page.entity';
import { PagesService } from 'src/pages/pages.service';
import { Plan } from 'src/plans/entities/plan.entity';
import { PlansService } from 'src/plans/plans.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';

@Module({
  imports: [SequelizeModule.forFeature([Contract, User, Plan, Page])],
  providers: [ContractsService, UsersService, PlansService, PagesService],
  exports: [ContractsService, UsersService, PlansService, PagesService],
})
export class ContractsModule {}
