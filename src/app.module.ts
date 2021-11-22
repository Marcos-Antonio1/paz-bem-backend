import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChurchModule } from './church/church.module';
import { PublicationModule } from './publication/publication.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USERNAME_BD ,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
