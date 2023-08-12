import supertest from 'supertest'

describe('apitest', () => {
  it('curl http://localhost:3000/health test', (done) => {
    supertest('http://localhost:3000')
      .get('/health')
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body).toBe('success')
        done()
      })
  })

  it('curl test todo create', (done) => {
    supertest('http://localhost:3000')
      .post('/todos')
      .send({
        title: 'test-title',
        desc: 'test-desc',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body?.data).toBe('success')
        done()
      })
  })

  it('curl test todo read', (done) => {
    supertest('http://localhost:3000')
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length).toBeGreaterThanOrEqual(1)
        done()
      })
  })
})
