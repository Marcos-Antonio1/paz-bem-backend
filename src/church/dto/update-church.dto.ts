import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateChurchDto {
    
    @ApiPropertyOptional()
    nome?:string;
    
    @ApiPropertyOptional()
    rua?:string;

    @ApiPropertyOptional()
    @IsEmail()
    email?:string;


    @ApiPropertyOptional()
    estado?:string;

    @ApiPropertyOptional()
    cidad?:string;


    @ApiPropertyOptional()
    image?:string;

    @ApiPropertyOptional()
    cep?:string;
    
    @ApiPropertyOptional()
    telefone1?:string;
    
    @ApiPropertyOptional()
    telefone2?:string;
    
    @ApiPropertyOptional()
    whats1?:string;
    
    @ApiPropertyOptional()
    whats2?:string;

    @ApiPropertyOptional()
    pix1?:string;
    
    @ApiPropertyOptional()
    pix2?:string;

}