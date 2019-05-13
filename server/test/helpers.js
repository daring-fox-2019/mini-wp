const bcrypt = require('bcryptjs')
const faker = require('faker')
const jwt = require('jsonwebtoken')

const models = require('../models')

const clearDb = (...modelsName) => (done) => {
  Promise.all(
    modelsName.map(
      modelName => models[modelName].deleteMany({})
    )
  )
    .then(() => done())
    .catch(done)
}

const createUser = () => {
  const rawPassword = faker.internet.password()
  return models.User
    .create({
      email: faker.internet.email(),
      password: rawPassword
    })
    .then(user => {
      this.user = user
      this.user.rawPassword = rawPassword
      return this.user
    })
}

const createToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, process.env.JWT_SECRET_KEY)
}

const createArticle = ({ authorId }) => {
  return models.Article
    .create({
      title: faker.lorem.sentence(),
      coverImg: 'https://picsum.photos/300/200',
      body: faker.lorem.paragraph(),
      authorId
    })
}

const createTag = () => {
  return {
    name: faker.hacker.noun()
  }
}

const comparePassword = (str, hash) => bcrypt.compareSync(str, hash)

module.exports = {
  clearDb,
  comparePassword,
  createUser,
  createToken,
  createArticle,
  createTag
}
