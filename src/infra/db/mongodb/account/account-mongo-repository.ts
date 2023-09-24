import { ObjectId } from 'mongodb'
import type { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import type { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import type { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import type { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'

export class AccountMongoRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const accountToBeInserted = Object.assign({}, accountData)
    const result = await accountCollection.insertOne(accountToBeInserted)
    const account = Object.assign({}, accountData, {
      id: result.insertedId.toHexString()
    })
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = (await accountCollection.findOne({
      email
    })) as unknown as AccountModel
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = (await accountCollection.findOne({
      accessToken: token,
      role
    })) as unknown as AccountModel
    return account && MongoHelper.map(account)
  }
}
