import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
        {
            usernameField:'email'
        }
    );
  }

  async validate(email: string, password: string): Promise<any> {
    const church = await this.authService.validateUser(email, password);
    if (!church) {
      throw new UnauthorizedException();
    }
    return church;
  }
}