import type {
  httpRequest,
  httpResponse,
  Controller,
  AddAccount,
  Validation
} from './signup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      await this.addAccount.add({
        name,
        email,
        password
      })
      return ok({ message: 'Conta criada com sucesso' })
    } catch (error) {
      return serverError(error)
    }
  }
}
