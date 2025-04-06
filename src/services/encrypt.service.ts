import * as bcrypt from 'bcrypt';

export class EncryptService {
    // Number of salt rounds for bcrypt hashing
    private static readonly saltRounds = 10;

    /**
     * Encrypts a plain text password using bcrypt.
     * @param password - The plain text password to encrypt.
     * @returns A promise that resolves to the hashed password.
     */
    static async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param password - The plain text password to compare.
     * @param hash - The hashed password to compare against.
     * @returns A promise that resolves to a boolean indicating if the passwords match.
     */
    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    
}