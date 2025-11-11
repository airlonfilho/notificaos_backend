import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../../application/interfaces/providers/IHashProvider.js';

export class HashProvider implements IHashProvider {
  constructor(private readonly saltRounds: number) {}

  async hash(value: string): Promise<string> {
    return hash(value, this.saltRounds);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}