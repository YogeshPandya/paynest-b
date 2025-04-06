import { Controller, Get, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import sendResponse from 'src/middleware/sendResponse';
import { __ } from 'i18n';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { JwtService } from 'src/services/jwt.service';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
      try {
          const user = await this.usersService.createUser(createUserDto);
          const token = this.jwtService.generateToken({ id: user?._id, phoneNumber: user?.phoneNumber});
          return res.status(HttpStatus.OK).send(sendResponse(__('success.create_user'), { data: user, access_token: token  }, true));
      } catch (error) {
          const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
          return res.status(status).send(sendResponse(__('error.create_user_failed'), { error: error.message }, false));
      }
  }

  @Post('login')
    async login(@Body() loginDto: { phoneNumber: string; password: string }, @Res() res: Response) {
        try {
            const user = await this.usersService.validateUser(loginDto.phoneNumber, loginDto.password);
            const token = this.jwtService.generateToken({ id: user?._id, phoneNumber: user?.phoneNumber});
            return res.status(HttpStatus.OK).send(sendResponse(__('success.logged_successfully'), { data: user, access_token: token }, true));
        } catch (error) {
            const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            return res.status(status).send(sendResponse(__('error.logging_in'), { error: error.message }, false));
        }
    }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
