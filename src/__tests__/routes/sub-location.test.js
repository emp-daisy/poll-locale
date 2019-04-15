import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';

const LocationSchema = mongoose.model('Location');
const SubLocationSchema = mongoose.model('SubLocation');

describe.only('Sub-Location API Integration Tests', () => {
  let locationId;
  beforeAll(async () => {
    const location = await new LocationSchema({
      name: 'Lagos',
      description: 'Ikeja',
    }).save();
    locationId = location.id;
  });

  describe('GET / sublocation', () => {
    it('should get all sublocation', (done) => {
      request(app)
        .get('/api/sublocation/')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('All sub-locations');
          expect(res.body.locations.length).toEqual(0);
          expect(res.body.locations).toEqual([]);
          done();
        });
    });
  });

  describe('GET / sublocation by name/id', () => {
    it('should fail if subsublocation does not exist', (done) => {
      request(app)
        .get('/api/sublocation/Ikeja')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Sub-Location does not exist');
          done();
        });
    });

    it('should get all sublocation', async (done) => {
      const sublocation = await new SubLocationSchema({
        name: 'Ikeja',
        maleCount: 20,
        femaleCount: 20,
        locationId,
      }).save();
      request(app)
        .get(`/api/sublocation/${sublocation.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Sub-Location found');
          expect.objectContaining({
            name: 'Ikeja',
            maleCount: 20,
            femaleCount: 20,
            id: sublocation.id,
          });
          done();
        });
    });
  });

  describe('POST / sublocation', () => {
    it('should save new sublocation', (done) => {
      request(app)
        .post('/api/sublocation')
        .send({
          name: 'Ilupeju',
          maleCount: 20,
          femaleCount: 20,
          locationId,
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.message).toEqual('New sub-location created');
          expect.objectContaining({
            name: 'Ilupeju',
            maleCount: 20,
            femaleCount: 20,
            locationId,
          });
          done();
        });
    });

    it('should fail if location invalid data passed', (done) => {
      request(app)
        .post('/api/sublocation')
        .send({
          name: 'Ilupeju',
          maleCount: 20,
          femaleCount: 20,
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual(['Location ID is required']);
          done();
        });
    });

    it('should fail if location invalid data type passed', (done) => {
      request(app)
        .post('/api/sublocation')
        .send({
          name: 'Yaba',
          maleCount: 'two',
          femaleCount: 20,
          locationId,
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual([`Invalid value '${'two'}' passed for maleCount`]);
          done();
        });
    });
  });

  describe('PUT / sublocation by id', () => {
    let location;
    beforeAll(async () => {
      location = await new SubLocationSchema({
        name: 'Magodo',
        maleCount: 20,
        femaleCount: 20,
        locationId,
      }).save();
    });
    it('should update location', (done) => {
      request(app)
        .put(`/api/sublocation/${location.id}`)
        .send({
          name: 'Maryland',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Sub-Location updated');
          expect.objectContaining({
            name: 'Maryland',
            maleCount: 20,
            femaleCount: 20,
            locationId,
          });
          done();
        });
    });

    it('should fail with invalid location ID', (done) => {
      request(app)
        .put('/api/sublocation/32213')
        .send({
          name: 'xyz',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toEqual('Invalid id parameter');
          done();
        });
    });

    it('should fail if invalid parent location ID does not exist', async (done) => {
      request(app)
        .put(`/api/sublocation/${location.id}`)
        .send({
          name: 'Lekki',
          locationId: location.id,
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual(['Location with ID does not exists!']);
          done();
        });
    });

    it('should fail if location ID does not exist', async (done) => {
      await location.remove();
      request(app)
        .put(`/api/sublocation/${location.id}`)
        .send({
          name: 'Lekki',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Sub-Location does not exist');
          done();
        });
    });
  });

  describe('DELETE / sublocation by id', () => {
    let location;
    beforeAll(async () => {
      location = await new SubLocationSchema({
        name: 'Ajah',
        maleCount: 20,
        femaleCount: 20,
        locationId,
      }).save();
      location.toObject();
    });

    it('should delete location', (done) => {
      request(app)
        .delete(`/api/sublocation/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Sub-Location deleted');
          expect.objectContaining({
            name: 'Ajah',
            maleCount: 20,
            femaleCount: 20,
            locationId,
          });
          done();
        });
    });

    it('should fail with invalid location ID', (done) => {
      request(app)
        .delete('/api/sublocation/32213')
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toEqual('Invalid id parameter');
          done();
        });
    });

    it('should fail if location does not exist', (done) => {
      request(app)
        .delete(`/api/sublocation/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Sub-Location does not exist');
          done();
        });
    });

    it.skip('should delete location', async (done) => {
      request(app)
        .delete(`/api/sublocation/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual('Location does not exist');
          done();
        });
    });
  });
});
