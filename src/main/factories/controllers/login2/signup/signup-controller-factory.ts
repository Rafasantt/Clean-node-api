import { SignUpController } from '../../../../../presentation/controllers/signup/signup-controller'
import type { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(controller)
}
