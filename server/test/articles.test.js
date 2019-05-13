const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiDatetime = require('chai-datetime')
const dirtyChai = require('dirty-chai')
const faker = require('faker')

const app = require('../app')
const helpers = require('./helpers')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)
chai.use(chaiDatetime)

const Article = function () {
  return {
    title: faker.lorem.sentence(),
    coverImg: 'https://picsum.photos/300/200',
    body: faker.lorem.paragraph(),
    tags: Array.from(Array(3), el => ({ name: faker.hacker.noun() }))
  }
}

describe('Article Tests', function () {
  before(function (done) {
    helpers.createUser()
      .then(user => {
        this.user = user
        this.user.token = helpers.createToken(user)
        return helpers.createArticle({ authorId: this.user._id })
      })
      .then(article => {
        this.article = article
        this.article.tags.push(helpers.createTag())
        return this.article.save()
      })
      .then(article => {
        this.article = article
        done()
      })
      .catch(done)
  })
  after(helpers.clearDb('User', 'Article'))

  describe('GET /articles', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get('/articles')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('articles')

          let { articles } = body
          expect(articles).to.be.an('array')
          expect(articles).to.have.lengthOf(1)

          let article = articles[0]
          expect(article).to.be.an('object')
          expect(article).to.have.property('_id')
          expect(article).to.have.property('title')
          expect(article).to.have.property('coverImg')
          expect(article).to.have.property('body')
          expect(article).to.have.property('createdAt')
          expect(article).to.have.property('tags')
          expect(article).to.have.property('authorId')
          expect(article._id).to.equal(this.article.id)
          expect(article.title).to.equal(this.article.title)
          expect(article.coverImg).to.equal(this.article.coverImg)
          expect(article.body).to.equal(this.article.body)
          expect(new Date(article.createdAt)).to.equalDate(this.article.createdAt)
          expect(article.authorId).to.equal(this.user.id)

          let { tags } = article
          expect(tags).to.be.an('array')
          expect(tags).to.have.lengthOf(1)

          let tag = tags[0]
          expect(tag).to.have.property('name')
          expect(tag.name).to.equal(this.article.tags[0].name)

          done()
        })
    })
  })

  describe('GET /articles/:article_id', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/articles/${this.article.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('article')

          let { article } = body
          expect(article).to.be.an('object')
          expect(article).to.have.property('_id')
          expect(article).to.have.property('title')
          expect(article).to.have.property('coverImg')
          expect(article).to.have.property('body')
          expect(article).to.have.property('tags')
          expect(article).to.have.property('authorId')
          expect(article._id).to.equal(this.article.id)
          expect(article.title).to.equal(this.article.title)
          expect(article.coverImg).to.equal(this.article.coverImg)
          expect(article.body).to.equal(this.article.body)
          expect(article.tags).to.have.lengthOf(this.article.tags.length)
          expect(article.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('POST /articles', function () {
    let createdArticle = new Article()
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/articles')
        .send(createdArticle)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('article')

          let { article } = body
          expect(article).to.be.an('object')
          expect(article).to.have.property('_id')
          expect(article).to.have.property('title')
          expect(article).to.have.property('coverImg')
          expect(article).to.have.property('body')
          expect(article).to.have.property('tags')
          expect(article).to.have.property('authorId')
          expect(article.title).to.equal(createdArticle.title)
          expect(article.coverImg).to.equal(createdArticle.coverImg)
          expect(article.body).to.equal(createdArticle.body)
          expect(article.tags).to.have.lengthOf(createdArticle.tags.length)
          expect(article.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('PUT /articles/:article_id', function () {
    let updatedArticle = new Article()
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .put(`/articles/${this.article.id}`)
        .send(updatedArticle)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('article')

          let { article } = body
          expect(article).to.have.property('_id')
          expect(article).to.have.property('title')
          expect(article).to.have.property('coverImg')
          expect(article).to.have.property('body')
          expect(article).to.have.property('tags')
          expect(article).to.have.property('authorId')
          expect(article._id).to.equal(this.article.id)
          expect(article.title).to.equal(updatedArticle.title)
          expect(article.coverImg).to.equal(updatedArticle.coverImg)
          expect(article.body).to.equal(updatedArticle.body)
          expect(article.tags).to.have.lengthOf(updatedArticle.tags.length)
          expect(article.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('DELETE /articles/:article_id', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/articles/${this.article.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('article')

          let { article } = body
          expect(article).to.be.an('object')
          expect(article).to.have.property('_id')
          expect(article._id).to.equal(this.article.id)
          done()
        })
    })
  })
})
