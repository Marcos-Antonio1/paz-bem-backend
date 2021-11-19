import {  ApiPropertyOptional } from '@nestjs/swagger';

export class EditPublicationDto{

    @ApiPropertyOptional()
    menssage:string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image: any;
}