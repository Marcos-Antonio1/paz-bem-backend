import { ApiProperty,ApiPropertyOptional} from "@nestjs/swagger";
import { 
    IsNotEmpty

} from "class-validator";

import { Type } from 'class-transformer';

export class UpdateEventDto{

    @ApiPropertyOptional()
    name:string;

    @ApiPropertyOptional()    
    local:string;
    
    @ApiPropertyOptional({description:'ano/mes/dia'})
    @Type(()=> Date)
    start_date:Date;

    
    @ApiPropertyOptional({description:'ano/mes/dia'})
    @Type(()=> Date)
    end_date:Date;
    
    @ApiPropertyOptional()  
    image:string;

    @ApiPropertyOptional()
    anexo:string;
}