import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_EXPIRY } from 'src/constant/time.const';

@Injectable()
export class JwtService {


  /**
   *
   * @param payload
   * @returns
   */
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRY});
  }

  /**
   *
   * @param token
   * @returns
   */
  decodeToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
