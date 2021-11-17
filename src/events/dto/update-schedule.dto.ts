import {
    IsNotEmpty
 } from 'class-validator';

import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateScheduleDto {
    
    @ApiPropertyOptional()
    title:string;

    @ApiPropertyOptional()
    local:string;

    @ApiPropertyOptional()
    horario:string;

    @ApiPropertyOptional()
    @Type(()=>Date)
    data:Date;

    @ApiPropertyOptional()
    menssage:string;
}