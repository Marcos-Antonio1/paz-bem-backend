import {  ApiPropertyOptional } from '@nestjs/swagger';

export class EditPublicationDto{

    @ApiPropertyOptional()
    menssage:string;


    @ApiPropertyOptional()
    image:string;
}