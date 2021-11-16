import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ParametersPagination } from './dto/parameters-pagination.dto';
import { EditPublicationDto } from './dto/update-publication.dto';
import { PublicationService } from './publication.service';

@ApiTags('Publication')
@Controller('publication')
export class PublicationController {

    constructor(
        private readonly publication:PublicationService
    ){} 

    @ApiOperation({summary:"Criar publicação"})
    @ApiResponse({status:200})
    @Post('/create/:id')
    async createPublication(@Param('id')id:string,@Body() createPublication:CreatePublicationDto){
        return await this.publication.createPublication(id,createPublication)
    } 

    @ApiOperation({summary:"Editar Publicação"})
    @ApiResponse({status:200})
    @Post('/edit/:id/:idpublication')
    async editPublication(@Param('id')id:string,@Param('idpublication')idpublication:string, @Body() editPublication:EditPublicationDto){
        return await this.publication.editPublication(id,idpublication,editPublication)
    }

    @ApiOperation({summary:"Excluir Publicação"})
    @ApiResponse({status:200})
    @Delete('/edit/:id/:idpublication')
    async deletePublication(@Param('id')id:string,@Param('idpublication')idpublication:string){
        return await this.publication.deletePublication(id,idpublication);
    }

    @ApiOperation({summary:"Buscar uma publicação"})
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
