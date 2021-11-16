import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Church } from "./entities/church.entity";

@EntityRepository(Church)
@Injectable()
export class ChurchRepository extends Repository<Church>{}