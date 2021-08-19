import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlansService } from 'src/plans/plans.service';
import { UsersService } from 'src/users/users.service';
import { Contract } from './entities/contract.entity';
import * as moment from "moment";
import { UpdateContractDto } from './dtos/update-contract.dto';
import { schemaToModel } from 'src/core/utils/crud';
import { CreateContractDto } from './dtos/create-contract.dto';
import { PagesService } from 'src/pages/pages.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract)
    private readonly contractModel: typeof Contract,
    private readonly usersService: UsersService,
    private readonly plansService: PlansService,
    private readonly pagesService: PagesService
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const selectedUser = await this.usersService.findOne(createContractDto.ownerId);
    const selectedPlan = await this.plansService.findOne(createContractDto.planId);

    if (createContractDto.pageId) {
      const selectedPage = await this.pagesService.findOne(createContractDto.pageId);

      if (selectedPage) {
        const selectedContract = await this.findOne(selectedPage.contractId);
        selectedContract.isActive = false;
        selectedContract.save();
      }
    }

    const contract = new Contract();
    contract.name = selectedPlan.name;
    contract.price = selectedPlan.price;
    contract.ownerId = selectedUser.id;
    contract.expiresIn = moment().add(createContractDto.expiresIn, 'months').toDate();
    contract.autoRenew = createContractDto.autoRenew;
    contract.planContent = selectedPlan.toJSON();

    if (contract.autoRenew) {
      contract.renewIn = moment().add(createContractDto.expiresIn, 'months').toDate();
    }

    return contract.save();
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);
    const updatedContract = schemaToModel(updateContractDto, contract) as Contract;

    return updatedContract.save();
  }

  async findAll(): Promise<Contract[]> {
    return this.contractModel.findAll();
  }

  findOne(id: string): Promise<Contract> {
    return this.contractModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const contract = await this.findOne(id);
    await contract.destroy();
  }
}
