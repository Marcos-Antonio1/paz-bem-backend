import { Injectable } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
      private readonly church:ChurchService,
      private readonly JwtService: JwtService
      ){}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const church = await this.church.getByEmail(email);
        if (church && await await bcrypt.compare(pass,church.password)) {
          const { password,...result } = church;
          return result;
        }
        return null;
    }

    async login(church:any){
      const payload = {email:church.email,id:church.id_church}
      return{
        access_token: this.JwtService.sign(payload),
      };
    }
}
