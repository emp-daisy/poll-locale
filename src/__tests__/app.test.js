import request from 'supertest';
import app from '../app';

describe('Entry Route', () => {
  it('should call the entry route', (done) => {
    request(app)
      .get('/api/')
      .expect(404, 'URL not found!')
      .end((err) => {
        if (err) throw done(err);
        done();
      });
  });
});