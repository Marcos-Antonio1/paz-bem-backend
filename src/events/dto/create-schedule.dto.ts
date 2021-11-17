import {
    IsNotEmpty
 } from 'class-validator';

 import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
    
    @ApiProperty()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    local:string;

    @ApiProperty()
    @IsNotEmpty()
    horario:string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(()=>Date)
    data:Date;

    @ApiProperty()
    @IsNotEmpty()
    menssage:string;
}