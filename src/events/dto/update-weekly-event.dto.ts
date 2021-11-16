import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWeeklyEventDto{
    
    @ApiPropertyOptional()
    name:string;

    @ApiProperty({
        enum:[1,2,3,4,5,6,7],
        description:' 1: para domingo e assim por diante até o sábado'
    })
    
    @ApiPropertyOptional()
    day_week:number;

    @ApiPropertyOptional()
    time:string

    @ApiPropertyOptional()
    image:string
}