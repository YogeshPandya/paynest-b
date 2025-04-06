import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // loads .env file and populates process.env
    MongooseModule.forRoot(process.env.MONGO_URI!), // connect to MongoDB Atlas
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log("process.env.MONGO_URI",process.env.MONGO_URI!);
