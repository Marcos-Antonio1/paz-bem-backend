import { Injectable } from '@nestjs/common';
import { ChurchService } from 'src/church/church.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(private readonly church:ChurchService){}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const church = await this.church.getByEmail(email);
        if (church && await await bcrypt.compare(pass,church.password)) {
          const { password,...result } = church;
          return result;
        }
        return null;
    }
}
