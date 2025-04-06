import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from './user.dto';
import { EncryptService } from 'src/services/encrypt.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(dto);
      return newUser.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || "Internal Server Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(phoneNumber: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ phoneNumber }).select('+password').lean();
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await EncryptService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || "Internal Server Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
