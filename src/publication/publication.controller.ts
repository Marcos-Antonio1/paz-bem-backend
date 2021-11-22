import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ParametersPagination } from './dto/parameters-pagination.dto';
import { EditPublicationDto } from './dto/update-publication.dto';
import { PublicationService } from './publication.service';
import { storage,fileFilter,limits } from './storage.config';


@ApiTags('Publication')
@Controller('publication')
export class PublicationController {

    constructor(
        private readonly publication:PublicationService
    ){} 

    @ApiOperation({summary:"Criar publicação"})
    @ApiResponse({status:200})
    @Post('/create/:id')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async createPublication(@Param('id')id:string,@Body() createPublication:CreatePublicationDto,@UploadedFile()image){
        if(image == undefined){
            createPublication.image = process.env.PREFIX_IMAGE + "/upload/images/publicationImage/default.image.jpg";
            return await this.publication.createPublication(id,createPublication)
        }
        createPublication.image = process.env.PREFIX_IMAGE + image.path;
        return await this.publication.createPublication(id,createPublication)
    } 

    @ApiOperation({summary:"Editar Publicação"})
    @ApiResponse({status:200})
    @Post('/edit/:id/:idpublication')
    @UseInterceptors(
        
        FileInterceptor("image",{storage,fileFilter,limits}), 
    )
    @ApiConsumes('multipart/form-data')
    async editPublication(@Param('id')id:string,@Param('idpublication')idpublication:string,@UploadedFile()image ,@Body() editPublication:EditPublicationDto){
        if(image == undefined){
            return await this.publication.editPublication(id,idpublication,editPublication)    
        }
        editPublication.image = process.env.PREFIX_IMAGE + image.path;
        return await this.publication.editPublication(id,idpublication,editPublication)
    }

    @ApiOperation({summary:"Excluir Publicação"})
    @ApiResponse({status:200})
    @Delete('/edit/:id/:idpublication')
    async deletePublication(@Param('id')id:string,@Param('idpublication')idpublication:string){
        return await this.publication.deletePublication(id,idpublication);
    }

    @ApiOperation({summary:"Selecionar uma publicação"})
    @ApiResponse({status:200})
    @Get('/edit/:id/:idpublication')
    async selectPublication(@Param('id')id:string,@Param('idpublication')idpublication:string){
        return await this.publication.getPublication(id,idpublication);
    }

    @ApiOperation({summary:"Listar Publicações"})
    @ApiResponse({status:200})
    @Get('/list/:take/:skip/:id')
    async listPost(@Query(){offset,limit,}:ParametersPagination,@Param('id')id:string){
        return this.publication.listPublications(offset,limit,id);
    }
        
}
