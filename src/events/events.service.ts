import { Injectable } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import { CreateWeeklyEventDto } from './dto/create-weekly-event.dto';
import { EventsRepository } from './events.repository';
import { WeeklyEventsRepository } from './weekly_events.repository';

@Injectable()
export class EventsService {

    constructor(
        private readonly eventWeekly:WeeklyEventsRepository,
        private readonly event:EventsRepository,
        private readonly church: ChurchService
    ){}

    async createWeeklyEvent(id,createEventWeelky:CreateWeeklyEventDto){
        let churchFound = await this.church.getById(id);
        
        console.log("igreja encontrada")
        console.log(churchFound)

        let weekEvent  = await this.eventWeekly.create(createEventWeelky);
        
        weekEvent.church=churchFound;

        console.log("evento")
        console.log(weekEvent)

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
}
