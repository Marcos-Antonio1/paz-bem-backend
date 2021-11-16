import {IsNumber, Min, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class ParametersPagination{
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset?: number;
   
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}