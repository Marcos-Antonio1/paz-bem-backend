import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChurchModule } from './church/church.module';
import { PublicationModule } from './publication/publication.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'paz_e_bem',
      entities: [__dirname +'/**/*.entity{.js,.ts}'],
      synchronize: true,
      uuidExtension:'uuid-ossp'
    }),
    ChurchModule,
    PublicationModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
