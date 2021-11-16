import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { WorkTime } from "./entities/work_time.entity";


@EntityRepository(WorkTime)
@Injectable()
export class WorkTimeRepository extends Repository<WorkTime>{}