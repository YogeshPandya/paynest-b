import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EncryptService } from 'src/services/encrypt.service';

export type UsertDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nickName: string;

  @Prop()
  invitationCode?: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UsertDocument>('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  try {
      this.password = await EncryptService.encryptPassword(this.password);
      next();
  } catch (err) {
      next(err);
  }
});
