import { Injectable } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { EditPublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {

     constructor(
        private readonly publi:PublicationRepository,
        private readonly church:ChurchService
    ){}

    async createPublication(id,createPublication:CreatePublicationDto){
         try{
            let churchFound = await this.church.getById(id);

            let publication = await this.publi.create(createPublication)

            publication.church=churchFound;

            return this.publi.save(publication);

        }catch(e){
            throw e;
        }
    }

    async editPublication(id,idpublication,editPublication:EditPublicationDto){
        try{

            let publicationFound = await this.getPublication(id,idpublication); 

            await this.publi.merge(publicationFound,editPublication)

            return await this.publi.save(publicationFound);
            
        }catch(e){
            throw e; 
        }
    }
    async deletePublication(id,idpublication){
        try{
            let churchFound = await this.church.getById(id);    
            return await this.publi.delete({publication_id:idpublication,church:churchFound})
        }
        catch(e){
            throw e;
        }
    }
    async getPublication(id,idpublication){
        return  await this.publi.createQueryBuilder('publication')
        .where('publication.publication_id=:idpublication AND publication.churchIdChurch = :id ',{idpublication,id})
        .getOne();
    }

    async listPublications(offset?:number,limit?:number,id?:string){
        let churchFound = await this.church.getById(id);

        const [result, total] = await this.publi.findAndCount({
            order:{created_at:"ASC"},
            where:{church:churchFound},
            take:limit,
            skip:offset
        })
        return {
            data:result,
            count:total
        }
    }



}
