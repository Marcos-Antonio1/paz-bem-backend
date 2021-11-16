import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchModule } from 'src/church/church.module';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService],
  imports:[ChurchModule,
    TypeOrmModule.forFeature([PublicationRepository]),
  ]
})
export class PublicationModule {}
