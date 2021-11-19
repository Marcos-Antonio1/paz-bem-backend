import { ApiProperty,ApiPropertyOptional} from "@nestjs/swagger";
import { 
    IsNotEmpty

} from "class-validator";

import { Type } from 'class-transformer';

export class CreateEventDto{

    @ApiProperty()
    name:string;

    @ApiProperty()    
    local:string;

    @IsNotEmpty()
    @ApiProperty({description:'ano/mes/dia'})
    @Type(()=> Date)
    start_date:Date;

    @IsNotEmpty()
    @ApiProperty({description:'ano/mes/dia'})
    @Type(()=> Date)
    end_date:Date;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image: any;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    anexo: any;
}