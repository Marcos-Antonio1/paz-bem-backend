import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './dto/login-dto';

@ApiTags('church')
@Controller()
export class AppController {
  
  constructor(
    private readonly authService: AuthService
    ){}
  
  @Get()
  getHello(): string {
    return "Paz e bem api 1.0";
  }


  @ApiOperation({summary:'Logar igreja'})
  @Post('/login')
  @UseGuards(LocalAuthGuard) 
  async login(@Body() body:LoginDto){
    return this.authService.login(body);
  }

}
