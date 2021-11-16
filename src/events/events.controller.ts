import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWeeklyEventDto } from './dto/create-weekly-event.dto';
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
   
}
