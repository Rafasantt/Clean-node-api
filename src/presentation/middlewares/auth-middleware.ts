import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import type { Middleware, httpRequest, httpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await new Promise(resolve => { resolve(error) })
  }
}
