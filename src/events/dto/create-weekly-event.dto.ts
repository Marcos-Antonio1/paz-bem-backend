import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty
} from 'class-validator';

export class CreateWeeklyEventDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty({
        enum:[1,2,3,4,5,6,7],
        description:' 1: para domingo e assim por diante até o sábado'
    })
    
    @IsNotEmpty()
    day_week:number;

    @ApiProperty()
    @IsNotEmpty()
    time:string

    @ApiPropertyOptional()
    image:string
}