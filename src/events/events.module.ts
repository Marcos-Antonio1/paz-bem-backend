import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchModule } from 'src/church/church.module';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { ScheduleRepository } from './schedule.respository';
import { WeeklyEventsRepository } from './weekly_events.repository';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports:[ChurchModule,
      TypeOrmModule.forFeature([EventsRepository,WeeklyEventsRepository,ScheduleRepository])
  ]
})
export class EventsModule {}
