import { Injectable } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateWeeklyEventDto } from './dto/create-weekly-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { EventsRepository } from './events.repository';
import { ScheduleRepository } from './schedule.respository';
import { WeeklyEventsRepository } from './weekly_events.repository';


@Injectable()
export class EventsService {

    constructor(
        private readonly eventWeekly:WeeklyEventsRepository,
        private readonly event:EventsRepository,
        private readonly church: ChurchService,
        private readonly schedule:ScheduleRepository
    ){}

    async createWeeklyEvent(id,createEventWeelky:CreateWeeklyEventDto){

        let churchFound = await this.church.getById(id);
        
        let weekEvent  = await this.eventWeekly.create(createEventWeelky);
        
        weekEvent.church=churchFound;
        
        return this.eventWeekly.save(weekEvent);
    }

    async updateWeeklyEvent(id,id_weekly_event,updateEventWeelky){
        
        let weekEvent = await this.eventWeekly.createQueryBuilder('weekly_events')
        .where("weekly_events.id_weekly_events = :id_weekly_event AND weekly_events.churchIdChurch = :id ",{id_weekly_event,id})
        .getOne();
        
        this.eventWeekly.merge(weekEvent,updateEventWeelky)

        return await this.eventWeekly.save(weekEvent);
    }

    async listWeeklyEvent(id){
        return await this.eventWeekly.createQueryBuilder('weekly_events')
        .where("weekly_events.churchIdChurch = :id",{id}).getMany();
    }

    async createEvent(id,createEvent:CreateEventDto){

        
        let churchFound = await this.church.getById(id);
        

        let evento = this.event.create(createEvent);

        evento.church = churchFound;

        return this.event.save(evento);
    }


    async editEvent(id,id_event,updateEvent:UpdateEventDto){

        let evento = await this.getEvent(id,id_event);

        await this.event.merge(evento,updateEvent);
        
        return this.event.save(evento);
    }

    async deleteEvent(id,id_event){
        try{
            let churchFound = await this.church.getById(id);    
            return await this.event.delete({id_event:id_event,church:churchFound})
        }
        catch(e){
            throw e;
        }
    }
    
    async listEvents(offset,limit,id){
        let churchFound = await this.church.getById(id);

        const [result, total] = await this.event.findAndCount({
            order:{created_at:"ASC"},
            where:{church:churchFound},
            take:limit,
            skip:offset
        })
        return {
            data:result,
            count:total
        }
    }

    async createSchedule(id,id_event,createSchedule:CreateScheduleDto){
        try{
            let evento = await this.getEvent(id,id_event);

            let sche = await this.schedule.create(createSchedule)
    
            sche.event=evento;
    
            return this.schedule.save(sche);
        }catch(e){
            throw e;
        }
    }

    async getEvent(id,id_event){
        return  await this.event.createQueryBuilder('event')
        .where('event.id_event = :id_event AND event.churchIdChurch = :id',{id_event,id})
        .getOne();
    }

    async updateSchedule(id,id_event,id_schedule,updateSchedule:UpdateScheduleDto){
        try{
            let evento = await this.getEvent(id,id_event);

            let sche = await this.getShedule(id_schedule,evento);

            this.schedule.merge(sche,updateSchedule);

            return this.schedule.save(sche);
        }catch(e){
            throw e;
        }
    }

    async deleteSchedule(id,id_event,id_schedule){
        try{
            let evento = await this.getEvent(id,id_event);
            return this.schedule.delete({id_schedule,event:evento})
        }
        catch(e){
            throw e;
        }
    }
    async listSchedule(id,id_event){
        try{
            let evento = await this.getEvent(id,id_event)

            return this.schedule.find({event:evento})

        }catch(e){
            throw e;
        }
    }
    
    async getSchedule(id,id_event,id_schedule){
        try{
            let evento = await this.getEvent(id,id_event);
            return this.schedule.findOne({id_schedule,event:evento})
        }catch(e){
            throw e;
        }
    }

    async getShedule(id_schedule,evento){
        return this.schedule.findOne({id_schedule,event:evento});
    }



}

