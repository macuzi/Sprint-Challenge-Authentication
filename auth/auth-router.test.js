const server = require('../api/server.js')
const request = require('supertest')

describe('logs in user', () => {
    it('should have status code of 200', async () => {
        const response = await request(server).get('/api/auth') // <<< PASSED
        expect(response.status).toEqual(200);
    })
})

it('should return a JSON object from the index route', async () => {
    const expectedBody = { api: "running" }

    const response = await request(server).get('/api/auth')

    expect(response.body).toEqual(expectedBody)
})
