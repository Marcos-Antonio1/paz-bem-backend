import { EntityRepository, Repository } from "typeorm";
import { WeeklyEvents } from "./entities/weekly_events.entity";

@EntityRepository(WeeklyEvents)
export class WeeklyEventsRepository extends Repository<WeeklyEvents> {}