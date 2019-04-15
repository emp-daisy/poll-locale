import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';

const LocationSchema = mongoose.model('Location');
const SubLocationSchema = mongoose.model('SubLocation');

describe('Location API Integration Tests', () => {
  describe('GET / location', () => {
    it('should get all locations', (done) => {
      request(app)
        .get('/api/location/')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('All locations');
          expect(res.body.locations.length).toEqual(0);
          expect(res.body.locations).toEqual([]);
          done();
        });
    });

    it('should fail if location does not exist', (done) => {
      request(app)
        .get('/api/location/Lagoss')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Location does not exist');
          done();
        });
    });

    it('should get all locations', async (done) => {
      const location = await new LocationSchema({
        name: 'Lagos',
        description: 'West-side',
      }).save();
      request(app)
        .get(`/api/location/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Location found');
          expect(res.body.location).toEqual(expect.objectContaining({
            name: 'Lagos',
            description: 'West-side',
            id: location.id,
            maleCount: 0,
            femaleCount: 0,
            subLocations: [],
          }));
          done();
        });
    });

    it('should get all locations with sublocations', async (done) => {
      const location = await new LocationSchema({
        name: 'Abia',
        description: 'Eastern-side',
      }).save();
      await new SubLocationSchema({
        name: 'Umuahia',
        maleCount: 20,
        femaleCount: 30,
        locationId: location.id,
      }).save();

      request(app)
        .get(`/api/location/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Location found');
          expect(res.body.location).toEqual(expect.objectContaining({
            name: 'Abia',
            description: 'Eastern-side',
            id: location.id,
            maleCount: 20,
            femaleCount: 30,
          }));
          done();
        });
    });
  });
  describe('POST / location', () => {
    it('should save new locations', (done) => {
      request(app)
        .post('/api/location')
        .send({
          name: 'Abuja',
          description: 'Capital',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.message).toEqual('New location created');
          expect(res.body.location).toEqual(expect.objectContaining({
            name: 'Abuja',
            description: 'Capital',
          }));
          done();
        });
    });

    it('should fail if location name exists', (done) => {
      request(app)
        .post('/api/location')
        .send({
          name: 'Abuja',
          description: 'Capital',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual(['Location name already exists!']);
          done();
        });
    });
  });
  describe('PUT / location by id', () => {
    let location;
    beforeAll(async () => {
      location = await new LocationSchema({
        name: 'Calabar',
        description: 'Calabar',
      }).save();
    });
    it('should update location', (done) => {
      request(app)
        .put(`/api/location/${location.id}`)
        .send({
          name: 'Cross River',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Location updated');
          expect(res.body.location).toEqual(expect.objectContaining({
            name: 'Cross River',
            description: 'Calabar',
            id: location.id,
          }));
          done();
        });
    });

    it('should fail with invalid location ID', (done) => {
      request(app)
        .put('/api/location/32213')
        .send({
          name: 'Cross River',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toEqual('Invalid id parameter');
          done();
        });
    });

    it('should fail if location name already exist', async (done) => {
      await new LocationSchema({
        name: 'Delta',
        description: 'Asaba',
      }).save();
      request(app)
        .put(`/api/location/${location.id}`)
        .send({
          name: 'Delta',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual(['Location name already exists!']);
          done();
        });
    });

    it('should fail if location ID does not exist', async (done) => {
      await location.remove();
      request(app)
        .put(`/api/location/${location.id}`)
        .send({
          name: 'Cross River',
        })
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Location does not exist');
          done();
        });
    });
  });
  describe('DELETE / location by id', () => {
    it('should delete location', async (done) => {
      const location = await new LocationSchema({
        name: 'Rivers',
        description: 'PH',
      }).save();
      location.toObject();
      request(app)
        .delete(`/api/location/${location.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual('Location deleted');
          expect(res.body.location).toEqual(expect.objectContaining({
            name: 'Rivers',
            description: 'PH',
            id: location.id,
          }));
          done();
        });
    });

    it('should fail with invalid location ID', (done) => {
      request(app)
        .delete('/api/location/32213')
        .set('Accept', 'application/json')
        .end((_err, res) => {
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toEqual('Invalid id parameter');
          done();
        });
    });

    it('should fail if location does not exist', async (done) => {
      const mlocation = await new LocationSchema({
        name: 'Kogi',
        description: 'Lokoja',
      }).save();
      await mlocation.remove();
      request(app)
        .delete(`/api/location/${mlocation.id}`)
        .end((_err, res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual('Location does not exist');
          done();
        });
    });
  });
});
