/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const app = require('../../index')
const db = require('../../db')

const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/:userId', () => {
    const codysMeetupId = '111111111111111111111'
    const codysEmail = 'cody@puppybook.com'
    const codysFirstName = 'Cody'
    const codysLastName = 'DaPug'
    const codysFullName = 'Cody DaPug'
    const codysImgUrl =
      'https://vetstreet.brightspotcdn.com/dims4/default/354d0cf/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fdc%2Fc4%2F8ccd3a28438d81b2f2f5d8031a05%2Fpug-ap-r82p3q-645.jpg'

    beforeEach(() => {
      return User.create({
        meetupId: codysMeetupId,
        email: codysEmail,
        firstName: codysFirstName,
        lastName: codysLastName,
        fullName: codysFullName,
        imgUrl: codysImgUrl
      })
    })

    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // End describe('/api/users')
}) // End describe('User routes')
