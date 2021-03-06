import { ApiProperty , ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty
 } from 'class-validator';


export class CreatePublicationDto{

    @IsNotEmpty()
    @ApiProperty()
    menssage:string;


    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image: any;
}