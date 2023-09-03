import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, httpRequest, httpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
  }
}
