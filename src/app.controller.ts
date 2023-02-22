import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

// @Controller()
@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send')
  sendMessage(): string {
    return '222';
  }

  @Get('/getReq')
  getReq(@Req() request: Request, @Res() response: Response): any {
    console.log(request.headers);
    response.status(HttpStatus.OK).send();
  }

  @Get('/getReq2')
  getReq2(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): any {
    response.status(HttpStatus.OK);
    return [];
  }

  @Get('getQueryAndParam/:id?')
  getQuery(
    @Param('id') params: string,
    @Query() query: { value: number; qx: number },
  ): any {
    console.log('params', params);
    console.log('query', query);
    return '2222';
  }

  @Post('postQuery/:id?')
  postQuery(
    @Param('id') params: string,
    @Body() body: { value: number; qx: number },
  ): any {
    console.log('params', params);
    console.log('body', body);
    return 'PostQuery';
  }

  @Get('userState')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  userState(): any {
    return 'userState';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
