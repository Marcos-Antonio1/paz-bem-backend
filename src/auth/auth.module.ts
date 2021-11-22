import { Module } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService,PassportModule],
  imports: [ChurchService,LocalStrategy]
})
export class AuthModule {}
