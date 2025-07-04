import Jwt from 'jsonwebtoken'
import type { Encrypter } from '../../../data/protocols/criptography/encrypter'
import type { Decrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = Jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = Jwt.verify(token, this.secret)
    return value
  }
}
