import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { ObjectId, type Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 403 on signup without accessToken', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rafael',
          email: 'rafaelsantos@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })

    test('Should return 204 on signup with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Rafael',
        email: 'rafaelSantos@hotmail.com',
        password: '1234',
        role: 'admin'
      })
      const id = res.insertedId.toHexString()
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: new ObjectId(id)
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/signup')
        .set('x-access-token', accessToken)
        .send({
          name: 'Novo User',
          email: 'novoUser@hotmail.com',
          password: 'abc123',
          passwordConfirmation: 'abc123'
        })
        .expect(204)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'Rafael',
        email: 'rafael_santos.s1@hotmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafael_santos.s1@hotmail.com',
          password: '1234'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafael_santos.s1@hotmail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
