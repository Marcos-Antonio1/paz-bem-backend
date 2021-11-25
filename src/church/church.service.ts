import {  Injectable } from '@nestjs/common';
import { ChurchRepository } from './church.repository';
import { CreateChurchDto } from './dto/create-church.dto';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { UpdateWorkTimeDto } from './dto/update-work-time.dto';
import { WorkTimeRepository } from './work_time.respository';

@Injectable()
export class ChurchService {
    constructor(
        private readonly churchRepository:ChurchRepository,
        private readonly  WorkTime:WorkTimeRepository
    ){}
    
    async create(createdto:CreateChurchDto){
        try{
            const church = await this.churchRepository.create(createdto);
            return await this.churchRepository.save(church);
        }catch(erro){
            throw erro;
        }
    }

    async update(id:string,updateChurchDto:UpdateChurchDto){
        try{
            let churchFound = await this.getById(id);
            this.churchRepository.merge(churchFound,updateChurchDto);
            return this.churchRepository.save(churchFound);
        }catch(erro){
            throw erro;
        }
    }

    async createWorkTime(id:string,createWorkTime:CreateWorkTimeDto){
        try{            
            let churchFound = await this.getById(id);
            
            let workTimeCreate = await this.WorkTime.create(createWorkTime);

            workTimeCreate.church = churchFound;

            await this.WorkTime.save(workTimeCreate);

        }catch(erro){
            throw erro;
        }
    }

    async listWorkTime(id){
        return this.WorkTime.createQueryBuilder('work_time')
        .where("work_time.churchIdChurch = :id",{id})
        .getMany();
    }

    async updateWorkTime(id,id_work_time,updateWorkTime:UpdateWorkTimeDto){
        
        let worktime = await this.WorkTime.createQueryBuilder('work_time').
        where("work_time.churchIdChurch = :id AND id_time =:id_work_time",{id,id_work_time})
        .getOne();

        await this.WorkTime.merge(worktime,updateWorkTime)

        return this.WorkTime.save(worktime);

    } 

    async listChurch (){
        return this.churchRepository.find();
    }

    async getById(id){
        return await this.churchRepository.findOne({id_church:id});
    }

    async getByEmail(email){
        return await this.churchRepository.findOne({email})
    }

    
}
