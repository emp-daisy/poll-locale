"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("../../app"));

var LocationSchema = _mongoose["default"].model('Location');

var SubLocationSchema = _mongoose["default"].model('SubLocation');

describe('Location API Integration Tests', function () {
  describe('GET / location', function () {
    it('should get all locations', function (done) {
      (0, _supertest["default"])(_app["default"]).get('/api/location/').end(function (_err, res) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All locations');
        expect(res.body.locations.length).toEqual(0);
        expect(res.body.locations).toEqual([]);
        done();
      });
    });
    it('should fail if location does not exist', function (done) {
      (0, _supertest["default"])(_app["default"]).get('/api/location/Lagoss').end(function (_err, res) {
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Location does not exist');
        done();
      });
    });
    it('should get all locations',
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(done) {
        var location;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new LocationSchema({
                  name: 'Lagos',
                  description: 'West-side'
                }).save();

              case 2:
                location = _context.sent;
                (0, _supertest["default"])(_app["default"]).get("/api/location/".concat(location.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(200);
                  expect(res.body.message).toEqual('Location found');
                  expect(res.body.location).toEqual(expect.objectContaining({
                    name: 'Lagos',
                    description: 'West-side',
                    id: location.id,
                    maleCount: 0,
                    femaleCount: 0,
                    subLocations: []
                  }));
                  done();
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    it('should get all locations with sublocations',
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(done) {
        var location;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new LocationSchema({
                  name: 'Abia',
                  description: 'Eastern-side'
                }).save();

              case 2:
                location = _context2.sent;
                _context2.next = 5;
                return new SubLocationSchema({
                  name: 'Umuahia',
                  maleCount: 20,
                  femaleCount: 30,
                  locationId: location.id
                }).save();

              case 5:
                (0, _supertest["default"])(_app["default"]).get("/api/location/".concat(location.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(200);
                  expect(res.body.message).toEqual('Location found');
                  expect(res.body.location).toEqual(expect.objectContaining({
                    name: 'Abia',
                    description: 'Eastern-side',
                    id: location.id,
                    maleCount: 20,
                    femaleCount: 30
                  }));
                  done();
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  describe('POST / location', function () {
    it('should save new locations', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/location').send({
        name: 'Abuja',
        description: 'Capital'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('New location created');
        expect(res.body.location).toEqual(expect.objectContaining({
          name: 'Abuja',
          description: 'Capital'
        }));
        done();
      });
    });
    it('should fail if location name exists', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/location').send({
        name: 'Abuja',
        description: 'Capital'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual(['Location name already exists!']);
        done();
      });
    });
  });
  describe('PUT / location by id', function () {
    var location;
    beforeAll(
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return new LocationSchema({
                name: 'Calabar',
                description: 'Calabar'
              }).save();

            case 2:
              location = _context3.sent;

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should update location', function (done) {
      (0, _supertest["default"])(_app["default"]).put("/api/location/".concat(location.id)).send({
        name: 'Cross River'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Location updated');
        expect(res.body.location).toEqual(expect.objectContaining({
          name: 'Cross River',
          description: 'Calabar',
          id: location.id
        }));
        done();
      });
    });
    it('should fail with invalid location ID', function (done) {
      (0, _supertest["default"])(_app["default"]).put('/api/location/32213').send({
        name: 'Cross River'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid id parameter');
        done();
      });
    });
    it('should fail if location name already exist',
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(done) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return new LocationSchema({
                  name: 'Delta',
                  description: 'Asaba'
                }).save();

              case 2:
                (0, _supertest["default"])(_app["default"]).put("/api/location/".concat(location.id)).send({
                  name: 'Delta'
                }).set('Accept', 'application/json').end(function (_err, res) {
                  expect(res.statusCode).toEqual(500);
                  expect(res.body.message).toEqual(['Location name already exists!']);
                  done();
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
    it('should fail if location ID does not exist',
    /*#__PURE__*/
    function () {
      var _ref5 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(done) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return location.remove();

              case 2:
                (0, _supertest["default"])(_app["default"]).put("/api/location/".concat(location.id)).send({
                  name: 'Cross River'
                }).set('Accept', 'application/json').end(function (_err, res) {
                  expect(res.statusCode).toEqual(404);
                  expect(res.body.message).toEqual('Location does not exist');
                  done();
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }());
  });
  describe('DELETE / location by id', function () {
    it('should delete location',
    /*#__PURE__*/
    function () {
      var _ref6 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(done) {
        var location;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return new LocationSchema({
                  name: 'Rivers',
                  description: 'PH'
                }).save();

              case 2:
                location = _context6.sent;
                location.toObject();
                (0, _supertest["default"])(_app["default"])["delete"]("/api/location/".concat(location.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(200);
                  expect(res.body.message).toEqual('Location deleted');
                  expect(res.body.location).toEqual(expect.objectContaining({
                    name: 'Rivers',
                    description: 'PH',
                    id: location.id
                  }));
                  done();
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }());
    it('should fail with invalid location ID', function (done) {
      (0, _supertest["default"])(_app["default"])["delete"]('/api/location/32213').set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid id parameter');
        done();
      });
    });
    it('should fail if location does not exist',
    /*#__PURE__*/
    function () {
      var _ref7 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(done) {
        var mlocation;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return new LocationSchema({
                  name: 'Kogi',
                  description: 'Lokoja'
                }).save();

              case 2:
                mlocation = _context7.sent;
                _context7.next = 5;
                return mlocation.remove();

              case 5:
                (0, _supertest["default"])(_app["default"])["delete"]("/api/location/".concat(mlocation.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(404);
                  expect(res.body.message).toEqual('Location does not exist');
                  done();
                });

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());
  });
});
//# sourceMappingURL=location.test.js.map