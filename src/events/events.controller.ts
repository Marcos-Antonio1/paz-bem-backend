import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParametersPagination } from 'src/publication/dto/parameters-pagination.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateWeeklyEventDto } from './dto/create-weekly-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateWeeklyEventDto } from './dto/update-weekly-event.dto';
import { EventsService } from './events.service';
import { storage } from './storage.config';
import { fileFilter } from './storage.config';
import { limits } from './storage.config';



@ApiTags("Events")
@Controller('events')
export class EventsController {

    public constructor(
        private readonly eventService: EventsService
    ) {}
    
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Criar Evento semanal"})
    @ApiResponse({status:200,description:"Evento cadastrado com sucesso"})
    @Post('/createventweekly/:id')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async createEventWeekly(@Param('id')id:string,@UploadedFile()image ,@Body()createEventWeelky:CreateWeeklyEventDto){
        if(image === undefined){
            createEventWeelky.image =process.env.PREFIX_IMAGE +`/upload/images/churchImage/default.image.jpg`
            return await this.eventService.createWeeklyEvent(id,createEventWeelky);
        }
        createEventWeelky.image =process.env.PREFIX_IMAGE + image.path;
        return await this.eventService.createWeeklyEvent(id,createEventWeelky);        
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Editar evento semanal"})
    @ApiResponse({status:200,description:"Evento Editado com sucesso com sucesso"})
    @Put('/createventweekly/:id/:id_weekly_event')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async updateEventWeekly(@Param('id')id:string,@Param('id_weekly_event') id_weekly_event:string,@Body()updateEventWeelky:UpdateWeeklyEventDto,@UploadedFile()image){
        if(image == undefined){
            return await this.eventService.updateWeeklyEvent(id,id_weekly_event,updateEventWeelky);
        }
        updateEventWeelky.image=process.env.PREFIX_IMAGE +image.path;
        return await this.eventService.updateWeeklyEvent(id,id_weekly_event,updateEventWeelky);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Deletar evento semanal"})
    @ApiResponse({status:200, description:"evento excluído com sucesso"})
    @Delete('/deleteventweekly/:id/:id_event')
    async deleteEventWeekly(@Param('id')id:string,@Param('id_event')id_event:string){
        return await this.eventService.deleteWeeklyEvent(id,id_event);
    }

    @ApiOperation({summary:"Listar eventos semanais"})
    @ApiResponse({status:200})
    @Get('/listventweekly/:id')
    async listEventWeekly(@Param('id')id:string){
        return await this.eventService.listWeeklyEvent(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Criar Evento"})
    @ApiResponse({status:200, description:"Evento criado com sucesso"})
    @Post('/createevent/:id')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async createEvent(@Param('id')id:string,@Body()createEvent:CreateEventDto,@UploadedFile()image){
        if(image == undefined){
            createEvent.image =`process.env.PREFIX_IMAGE +/upload/images/churchImage/default.image.jpg`
            return await this.eventService.createEvent(id,createEvent);    
        }
        createEvent.image =process.env.PREFIX_IMAGE +image.path;
        return await this.eventService.createEvent(id,createEvent);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Editar Evento"})
    @ApiResponse({status:200, description:"Evento Editado com sucesso"})
    @Put('/editevent/:id/:id_event')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async editEvent(@Param('id')id:string,@Param('id_event')id_event:string,@Body()updateEvent:UpdateEventDto,@UploadedFile()image){
        if(image =undefined){
            return await this.eventService.editEvent(id,id_event,updateEvent);
        }
        updateEvent.image = process.env.PREFIX_IMAGE + image.path
        return await this.eventService.editEvent(id,id_event,updateEvent);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Excluir Evento"})
    @ApiResponse({status:200, description:"Evento Excluido com sucesso"})
    @Delete('/deleteevent/:id/:id_event')
    async deleteEvent(@Param('id')id:string,@Param('id_event')id_event:string){
        return await this.eventService.deleteEvent(id,id_event);
    }

    @ApiOperation({summary:"Listar Eventos"})
    @ApiResponse({status:200})
    @Get('/list/:take/:skip/:id')
    async listPost(@Query(){offset,limit,}:ParametersPagination,@Param('id')id:string){
        return this.eventService.listEvents(offset,limit,id);
    }

    @ApiOperation({summary:"Selecionar Evento"})
    @ApiResponse({status:200, description:"Evento Excluido com sucesso"})
    @Get('/selectevent/:id/:id_event')
    async selectEvent(@Param('id')id:string,@Param('id_event')id_event:string){
        return await this.eventService.getEvent(id,id_event);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Criar Programação"})
    @ApiResponse({status:200,description:'programação criada com sucesso'})
    @Post('/createShedule/:id/:id_event')
    async createSchedule(
        @Param('id')id:string,
        @Param('id_event')id_event:string,
        @Body()createSchedule:CreateScheduleDto
        ){
        return this.eventService.createSchedule(id,id_event,createSchedule);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Editar Programação"})
    @ApiResponse({status:200,description:'Programação criada com sucesso'})
    @Put('/editShedule/:id/:id_event/:id_schedule')
    async editSchedule(
        @Param('id')id:string,
        @Param('id_event')id_event:string,
        @Param('id_schedule')id_schedule:string,
        @Body()updateSchedule:UpdateScheduleDto
        ){
        return this.eventService.updateSchedule(id,id_event,id_schedule,updateSchedule);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Excluir Programação"})
    @ApiResponse({status:200,description:'Programação Excluida com sucesso'})
    @Delete('/deleteShedule/:id/:id_event/:id_schedule')
    async DeleteSchedule(
        @Param('id')id:string,
        @Param('id_event')id_event:string,
        @Param('id_schedule')id_schedule:string,
        ){
        return this.eventService.deleteSchedule(id,id_event,id_schedule);
    }


    @ApiOperation({summary:"Lista Programação"})
    @ApiResponse({status:200})
    @Get('/listShedule/:id/:id_event/:id_schedule')
    async listSchedule(
        @Param('id')id:string,
        @Param('id_event')id_event:string,
        ){
        return this.eventService.listSchedule(id,id_event);
    }


    @ApiOperation({summary:"Selecionar Programação"})
    @ApiResponse({status:200})
    @Get('/selectShedule/:id/:id_event/:id_schedule')
    async getSchedule(
        @Param('id')id:string,
        @Param('id_event')id_event:string,
        @Param('id_schedule')id_schedule:string,
        ){
        return this.eventService.getSchedule(id,id_event,id_schedule);
    }
   
}
