import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ChurchModule } from 'src/church/church.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService,JwtStrategy,LocalStrategy],
  imports: [
    ChurchModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions:{expiresIn:'1 days'},
    }),
  ],
  exports:[AuthService]
})
export class AuthModule {}
