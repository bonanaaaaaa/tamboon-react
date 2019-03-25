import nock from 'nock'

import httpRequest from './httpRequest'

const url = 'http://www.example.com'
let testHttpRequest

describe('httpRequest.get', () => {
  beforeAll(() => {
    testHttpRequest = httpRequest(url)
  })

  beforeEach(() => nock.cleanAll())
  afterEach(() => nock.cleanAll())

  it('should call get request correctly', async () => {
    const response = { id: '123ABC' }
    nock(url)
      .get('/sample')
      .reply(200, { id: '123ABC' })

    const actualResponse = await testHttpRequest.get('/sample')

    expect(actualResponse).toEqual(response)
  })

  it('should call get request correctly with params', async () => {
    const response = { id: '123ABC' }
    nock(url)
      .get('/sample')
      .query({
        x: 1,
        y: 2,
      })
      .reply(200, { id: '123ABC' })

    const actualResponse = await testHttpRequest.get('/sample', { x: 1, y: 2 })

    expect(actualResponse).toEqual(response)
  })
})
