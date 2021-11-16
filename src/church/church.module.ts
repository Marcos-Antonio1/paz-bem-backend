import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchController } from './church.controller';
import { ChurchRepository } from './church.repository';
import { ChurchService } from './church.service';
import { WorkTimeRepository } from './work_time.respository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChurchRepository,WorkTimeRepository ])
  ],
  controllers: [ChurchController],
  providers: [ChurchService],
  exports:[ChurchService]
  
})
export class ChurchModule {}
