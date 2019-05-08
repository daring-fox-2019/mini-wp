const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')
const faker = require('faker')

const app = require('../app')
const helpers = require('./helpers')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

let rawPassword = faker.internet.password()
let createdUser = {
  email: faker.internet.email(),
  password: rawPassword,
  rawPassword
}

describe('Auth Tests', function () {
  describe('POST /auth/register', function () {
    after(helpers.clearDb('User'))
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send(createdUser)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')

          let { user } = res.body
          expect(user).to.be.an('object')
          expect(user).to.have.property('_id')
          expect(user).to.have.property('email')
          expect(user).to.have.property('password')
          expect(user.email).to.equal(createdUser.email)
          expect(helpers.comparePassword(
            createdUser.rawPassword,
            user.password
          )).to.be.true()
          done()
        })
    })
  })

  describe('POST /auth/login', function () {
    before(function (done) {
      helpers
        .createUser()
        .then(user => {
          this.user = user
          this.user.token = helpers.createToken(user)
          done()
        })
        .catch(done)
    })
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          email: this.user.email,
          password: this.user.rawPassword
        })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')

          let { user } = res.body
          expect(user).to.be.an('object')
          expect(user).to.have.property('_id')
          expect(user).to.have.property('email')
          expect(user).to.have.property('password')
          expect(user._id).to.equal(this.user.id)
          expect(user.email).to.equal(this.user.email)
          expect(helpers.comparePassword(
            this.user.rawPassword,
            this.user.password
          )).to.be.true()
          done()
        })
    })
  })
})
