import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParametersPagination } from 'src/publication/dto/parameters-pagination.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateWeeklyEventDto } from './dto/create-weekly-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateWeeklyEventDto } from './dto/update-weekly-event.dto';
import { EventsService } from './events.service';

@ApiTags("Events")
@Controller('events')
export class EventsController {

    public constructor(
        private readonly eventService: EventsService
    ) {}
    
    @ApiOperation({summary:"Criar Evento semanal"})
    @ApiResponse({status:200,description:"Evento cadastrado com sucesso"})
    @Post('/createventweekly/:id')
    async createEventWeekly(@Param('id')id:string, @Body()createEventWeelky:CreateWeeklyEventDto){
        return await this.eventService.createWeeklyEvent(id,createEventWeelky);
    }

    @ApiOperation({summary:"Editar evento semanal"})
    @ApiResponse({status:200,description:"Evento Editado com sucesso com sucesso"})
    @Put('/createventweekly/:id/:id_weekly_event')
    async updateEventWeekly(@Param('id')id:string,@Param('id_weekly_event') id_weekly_event:string,@Body()updateEventWeelky:UpdateWeeklyEventDto){
        return await this.eventService.updateWeeklyEvent(id,id_weekly_event,updateEventWeelky);
    }

    @ApiOperation({summary:"Listar eventos semanais"})
    @ApiResponse({status:200})
    @Get('/listventweekly/:id')
    async listEventWeekly(@Param('id')id:string){
        return await this.eventService.listWeeklyEvent(id);
    }

    @ApiOperation({summary:"Criar Evento"})
    @ApiResponse({status:200, description:"Evento criado com sucesso"})
    @Post('/createevent/:id')
    async createEvent(@Param('id')id:string,@Body()createEvent:CreateEventDto){
        return await this.eventService.createEvent(id,createEvent);
    }

    @ApiOperation({summary:"Editar Evento"})
    @ApiResponse({status:200, description:"Evento Editado com sucesso"})
    @Put('/editevent/:id/:id_event')
    async editEvent(@Param('id')id:string,@Param('id_event')id_event:string,@Body()updateEvent:UpdateEventDto){
        return await this.eventService.editEvent(id,id_event,updateEvent);
    }

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
    @Delete('/selectevent/:id/:id_event')
    async selectEvent(@Param('id')id:string,@Param('id_event')id_event:string){
        return await this.eventService.getEvent(id,id_event);
    }

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
