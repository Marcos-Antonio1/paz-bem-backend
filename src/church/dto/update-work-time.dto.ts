import  { 
    IsNotEmpty
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkTimeDto{
    
    @ApiPropertyOptional({maxLength:20})
    morning_time?: string;
    
    @ApiPropertyOptional({maxLength:20})
    afternoon_time?: string;

     
    @ApiPropertyOptional({
        enum:[1,2,3,4,5,6,7],
        description:' 1: para domingo e assim por diante até o sábado'
    })
    day_week:number;


}