import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChurchService } from './church.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { UpdateWorkTimeDto } from './dto/update-work-time.dto';
import {fileFilter } from './storage.config';
import {limits} from './storage.config';
import {storage} from './storage.config';


@ApiTags('church')
@Controller('church')
export class ChurchController {
    
    constructor(private readonly churchService:ChurchService){}

    @ApiOperation({summary:"Criar uma nova igreja"})
    @ApiResponse({status:200,description:"igreja cadastrada com sucesso"})
    @Post('/create')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async createChurh(@Body() createdto:CreateChurchDto,@UploadedFile()image){

        if(image === undefined){
           createdto.image =process.env.PREFIX_IMAGE +`/upload/images/churchImage/default.image.jpg`
            return await this.churchService.create(createdto)
        }
        createdto.image = process.env.PREFIX_IMAGE + image.path;
        return await this.churchService.create(createdto); 
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Editar dados da igreja"})
    @ApiResponse({status:200,description:"dados editados com sucesso"})
    @Put('/edit/:id')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async editChurch(@Param('id')id:string, @Body()updateChurchDto:UpdateChurchDto,@UploadedFile()image){
        if(image == undefined){
            return await this.churchService.update(id,updateChurchDto);    
        }
        updateChurchDto.image = process.env.PREFIX_IMAGE + image.path;
        return await this.churchService.update(id,updateChurchDto);
    }

    @ApiOperation({summary:"Listar Igrejas"})
    @ApiResponse({status:200})
    @Get('/listChurch')
    async ListAllChurch(){
        return await this.churchService.listChurch();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
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
