import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "Paz e bem api 1.0";
  }
}
