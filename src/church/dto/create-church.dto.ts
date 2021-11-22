import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';




export class CreateChurchDto {
    
    @ApiProperty()
    @IsNotEmpty()
    nome:string;
    
    @ApiProperty()
    @IsNotEmpty()
    rua:string;

    @ApiProperty()  
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    password:string;

    @ApiProperty()
    @IsNotEmpty()
    estado:string;

    @ApiProperty()
    @IsNotEmpty()
    cidad:string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image: any;

    @ApiProperty()
    @IsNotEmpty()
    cep:string;
    
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