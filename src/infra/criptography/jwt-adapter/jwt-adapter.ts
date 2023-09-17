import Jwt from 'jsonwebtoken'
import type { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = Jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
