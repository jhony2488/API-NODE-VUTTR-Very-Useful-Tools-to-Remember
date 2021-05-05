export {}

import request from 'supertest'
const app = require('../../src/app').express


if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env.development',
  })
} else {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  })
}

describe('AdminSession', () => {
  it('should answer 200 in the get users request for this route', async () => {
    const response = await request(app)
      .get('/admin/users?page=1')
      .set({ 'auth-token': process.env.APP_SECRET, user_id: 2 })

    expect(response.status).toBe(200)
  })

  it('should answer 401 in the get users request for this route', async () => {
    const response = await request(app)
      .get('/admin/users?page=1')
      .set({ 'auth-token': '123445' })

    expect(response.status).toBe(401)
  })

  it('should answer 200 in the get one user request for this route', async () => {
    const response = await request(app)
      .get(`/admin/users/${2}`)
      .set({ 'auth-token': process.env.APP_SECRET, user_id: 2 })

    expect(response.status).toBe(200)
  })

  it('should answer 401 in the get one user request for this route', async () => {
    const response = await request(app)
      .get(`/admin/users/${2}`)
      .set({ 'auth-token': '123445' })

    expect(response.status).toBe(401)
  })
})
