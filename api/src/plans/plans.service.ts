import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plan)
    private readonly planModel: typeof Plan,
  ) {}

  create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = new Plan();
    plan.name = createPlanDto.name;
    plan.price = createPlanDto.price;

    return plan.save();
  }

  async findAll(): Promise<Plan[]> {
    return this.planModel.findAll();
  }

  findOne(id: string): Promise<Plan> {
    return this.planModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const plan = await this.findOne(id);
    await plan.destroy();
  }
}
