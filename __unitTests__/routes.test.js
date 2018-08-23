const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const rewire = require('rewire');
const request = require('supertest');

const uuid = require('uuid/v1');

var app = require('../index.js');
var sandbox = sinon.createSandbox();

const mockAuth = [
  'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWI3ZGQ1OWVmZDNmMjAxODFjMGZkOTkwIn19',
  'session.sig=kfCpEEOZbfjmVgHSZibC62R0oL8'
];
const testUserId = '5b7dd59efd3f20181c0fd990';
const fakeTitle = uuid();
let newPostId;

describe('app', () => {
  afterEach(() => {
    app = require('../index.js');
    sandbox.restore();
  });

  after(() => {});

  describe('GET /api/current_user', () => {
    it('works correctly if user is authenticated', done => {
      request(app)
        .get('/api/current_user')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body._id).to.equal('5b7dd59efd3f20181c0fd990');
          expect(response.body.username).to.equal('mocha');
          done(err);
        });
    });

    it('works correctly if user is not authenticated', done => {
      request(app)
        .get('/api/current_user')
        .expect(204)
        .end((err, response) => {
          expect(response.length).to.be.undefined;
          done(err);
        });
    });
  });

  describe('POST /api/signin', () => {
    it('user can log in and receives cookies and data ', done => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'mocha@gmail.com',
          password: 'mocha'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body._id).to.equal('5b7dd59efd3f20181c0fd990');
          expect(response.body.username).to.equal('mocha');
          expect(response.header['set-cookie'].length).to.equal(2);
          done(err);
        });
    });

    it('user recieves unauthorized on wrong credentials', done => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'fake@gmail.com',
          password: 'fake'
        })
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });
  });

  describe('POST /api/signup', () => {
    it('user can create an account ', done => {
      const fakeId = uuid();
      request(app)
        .post('/api/signup')
        .send({
          email: `${fakeId}@gmail.com`,
          username: fakeId,
          password: 'mocha'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body._id).to.be.a('string');
          expect(response.body.username).to.be.a('string');
          expect(response.header['set-cookie'].length).to.equal(2);
          done(err);
        });
    });

    it('user can not create an account if the email is in use', done => {
      request(app)
        .post('/api/signup')
        .send({
          email: 'mocha@gmail.com',
          username: 'mocha',
          password: 'mocha'
        })
        .expect(422)
        .end((err, response) => {
          expect(response.body.error).to.equal('Email is in use');
          done(err);
        });
    });
  });

  describe('GET /api/logout', () => {
    it('user can log out and get cookies removed', done => {
      request(app)
        .get('/api/logout')
        .set('Cookie', mockAuth)
        .expect(302)
        .end((err, response) => {
          done(err);
        });
    });
  });

  describe('GET /api/get_posts/:board', () => {
    it('user can see /cyb/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/cyb')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /tech/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/tech')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /code/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/code')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /diy/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/diy')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /inter/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/inter')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /cult/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/cult')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /feels/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/feels')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /hum/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/hum')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });

    it('user can see /r/ board with its posts', done => {
      request(app)
        .get('/api/get_posts/r')
        .set('Cookie', mockAuth)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          done(err);
        });
    });
  });

  describe('POST /api/create_post', () => {
    it('user can create a post and see it in the current board', done => {
      request(app)
        .post('/api/create_post')
        .set('Cookie', mockAuth)
        .send({
          board: 'cyb',
          title: fakeTitle,
          message: `Mocha Test Post - ${fakeTitle}`
        })
        .expect(200)
        .end((err, response) => {
          newPostId = response.body[response.body.length - 1]._id;
          expect(response.body[response.body.length - 1].title).to.equal(fakeTitle);
          done(err);
        });
    });
  });

  describe('POST /api/post', () => {
    it('user can see a post by its link', done => {
      request(app)
        .post('/api/post')
        .set('Cookie', mockAuth)
        .send({
          postId: newPostId
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.board).to.equal('cyb');
          expect(response.body.title).to.equal(fakeTitle);
          expect(response.body.message).to.equal(`Mocha Test Post - ${fakeTitle}`);
          expect(response.body.commentCount).to.equal(0);
          done(err);
        });
    });

    it('handles wrong post resquests', done => {
      request(app)
        .post('/api/post')
        .set('Cookie', mockAuth)
        .send({
          postId: 'wrong_postId'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.err).to.equal('Invalid id');
          done(err);
        });
    });
  });

  describe('POST /api/add_comment', () => {
    it('user can add a comment to a post and see it', done => {
      request(app)
        .post('/api/add_comment')
        .set('Cookie', mockAuth)
        .send({
          postId: newPostId,
          message: 'Mocha test comment'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.comments[0].message).to.equal('Mocha test comment');
          expect(response.body.comments[0].user).to.equal('mocha');
          done(err);
        });
    });

    it('handles invalid postId', done => {
      request(app)
        .post('/api/add_comment')
        .set('Cookie', mockAuth)
        .send({
          postId: 'wrong postId',
          message: 'Mocha test comment'
        })
        .expect(422)
        .end((err, response) => {
          done(err);
        });
    });
  });

  describe('POST /api/user_posts', () => {
    it('can see all posts of a specific user', done => {
      request(app)
        .post('/api/user_posts')
        .set('Cookie', mockAuth)
        .send({
          userId: testUserId
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.a('array');
          expect(response.body.length > 0).to.be.true;
          expect(response.body[response.body.length - 1].title).to.equal(fakeTitle);
          done(err);
        });
    });

    it('handles invalid userId', done => {
      request(app)
        .post('/api/user_posts')
        .set('Cookie', mockAuth)
        .send({
          userId: 'wrong userId'
        })
        .end((err, response) => {
          expect(response.body.err).to.equal('Invalid id');
          done(err);
        });
    });
  });

});
