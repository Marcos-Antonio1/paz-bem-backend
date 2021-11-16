import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { ChurchService } from './church.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { UpdateWorkTimeDto } from './dto/update-work-time.dto';

@ApiTags('church')
@Controller('church')
export class ChurchController {
    
    constructor(private readonly churchService:ChurchService){}

    @ApiOperation({summary:"Criar uma nova igreja"})
    @ApiResponse({status:200,description:"igreja cadastrada com sucesso"})
    @Post('/create')
    async createChurh(@Body() createdto:CreateChurchDto){
        return await this.churchService.create(createdto);
    }

    @ApiOperation({summary:"Editar dados da igreja"})
    @ApiResponse({status:200,description:"dados editados com sucesso"})
    @Put('/edit/:id')
    async editChurch(@Param('id')id:string, @Body()updateChurchDto:UpdateChurchDto){
        return await this.churchService.update(id,updateChurchDto);
    }

    @ApiOperation({summary:"Criar Horário de funcionamento"})
    @ApiResponse({status:200,description:"Horário cadastrado com sucesso"})
    @Post('/createWorkTime/:id')
    async createWorkTime(@Param('id')id:string, @Body()createWorkTime:CreateWorkTimeDto){
        return await this.churchService.createWorkTime(id,createWorkTime);
    }
    
    @ApiOperation({summary:"Listar os horários de funcionamento"})
    @ApiResponse({status:200})
    @Get('/listWorkTime/:id')
    async listWorkTime(@Param('id')id:string){
        return await this.churchService.listWorkTime(id);
    }

    @ApiOperation({summary:"Atualiza horários"})
    @ApiResponse({status:200})
    @Put('/updateWortime/:id/:id_work_time')
    async updateWorkTime(
        @Param('id')id:string,
        @Param('id_work_time')id_work_time:string,
        @Body() updateWorkTime:UpdateWorkTimeDto
    ){
        return await this.churchService.updateWorkTime(id,id_work_time,updateWorkTime);
    }
}
