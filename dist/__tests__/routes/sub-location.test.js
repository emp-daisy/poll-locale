"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("../../app"));

var LocationSchema = _mongoose["default"].model('Location');

var SubLocationSchema = _mongoose["default"].model('SubLocation');

describe.only('Sub-Location API Integration Tests', function () {
  var locationId;
  beforeAll(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var location;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new LocationSchema({
              name: 'Lagos',
              description: 'Ikeja'
            }).save();

          case 2:
            location = _context.sent;
            locationId = location.id;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('GET / sublocation', function () {
    it('should get all sublocation', function (done) {
      (0, _supertest["default"])(_app["default"]).get('/api/sublocation/').end(function (_err, res) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All sub-locations');
        expect(res.body.locations.length).toEqual(0);
        expect(res.body.locations).toEqual([]);
        done();
      });
    });
  });
  describe('GET / sublocation by name/id', function () {
    it('should fail if subsublocation does not exist', function (done) {
      (0, _supertest["default"])(_app["default"]).get('/api/sublocation/Ikeja').end(function (_err, res) {
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Sub-Location does not exist');
        done();
      });
    });
    it('should get all sublocation',
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(done) {
        var sublocation;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new SubLocationSchema({
                  name: 'Ikeja',
                  maleCount: 20,
                  femaleCount: 20,
                  locationId: locationId
                }).save();

              case 2:
                sublocation = _context2.sent;
                (0, _supertest["default"])(_app["default"]).get("/api/sublocation/".concat(sublocation.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(200);
                  expect(res.body.message).toEqual('Sub-Location found');
                  expect.objectContaining({
                    name: 'Ikeja',
                    maleCount: 20,
                    femaleCount: 20,
                    id: sublocation.id
                  });
                  done();
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  describe('POST / sublocation', function () {
    it('should save new sublocation', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/sublocation').send({
        name: 'Ilupeju',
        maleCount: 20,
        femaleCount: 20,
        locationId: locationId
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('New sub-location created');
        expect.objectContaining({
          name: 'Ilupeju',
          maleCount: 20,
          femaleCount: 20,
          locationId: locationId
        });
        done();
      });
    });
    it('should fail if location invalid data passed', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/sublocation').send({
        name: 'Ilupeju',
        maleCount: 20,
        femaleCount: 20
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual(['Location ID is required']);
        done();
      });
    });
    it('should fail if location invalid data type passed', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/sublocation').send({
        name: 'Yaba',
        maleCount: 'two',
        femaleCount: 20,
        locationId: locationId
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual(["Invalid value '".concat('two', "' passed for maleCount")]);
        done();
      });
    });
  });
  describe('PUT / sublocation by id', function () {
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
              return new SubLocationSchema({
                name: 'Magodo',
                maleCount: 20,
                femaleCount: 20,
                locationId: locationId
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
      (0, _supertest["default"])(_app["default"]).put("/api/sublocation/".concat(location.id)).send({
        name: 'Maryland'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Sub-Location updated');
        expect.objectContaining({
          name: 'Maryland',
          maleCount: 20,
          femaleCount: 20,
          locationId: locationId
        });
        done();
      });
    });
    it('should fail with invalid location ID', function (done) {
      (0, _supertest["default"])(_app["default"]).put('/api/sublocation/32213').send({
        name: 'xyz'
      }).set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid id parameter');
        done();
      });
    });
    it('should fail if invalid parent location ID does not exist',
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(done) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _supertest["default"])(_app["default"]).put("/api/sublocation/".concat(location.id)).send({
                  name: 'Lekki',
                  locationId: location.id
                }).set('Accept', 'application/json').end(function (_err, res) {
                  expect(res.statusCode).toEqual(500);
                  expect(res.body.message).toEqual(['Location with ID does not exists!']);
                  done();
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2) {
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
                (0, _supertest["default"])(_app["default"]).put("/api/sublocation/".concat(location.id)).send({
                  name: 'Lekki'
                }).set('Accept', 'application/json').end(function (_err, res) {
                  expect(res.statusCode).toEqual(404);
                  expect(res.body.message).toEqual('Sub-Location does not exist');
                  done();
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
  });
  describe('DELETE / sublocation by id', function () {
    var location;
    beforeAll(
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return new SubLocationSchema({
                name: 'Ajah',
                maleCount: 20,
                femaleCount: 20,
                locationId: locationId
              }).save();

            case 2:
              location = _context6.sent;
              location.toObject();

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should delete location', function (done) {
      (0, _supertest["default"])(_app["default"])["delete"]("/api/sublocation/".concat(location.id)).end(function (_err, res) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Sub-Location deleted');
        expect.objectContaining({
          name: 'Ajah',
          maleCount: 20,
          femaleCount: 20,
          locationId: locationId
        });
        done();
      });
    });
    it('should fail with invalid location ID', function (done) {
      (0, _supertest["default"])(_app["default"])["delete"]('/api/sublocation/32213').set('Accept', 'application/json').end(function (_err, res) {
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid id parameter');
        done();
      });
    });
    it('should fail if location does not exist', function (done) {
      (0, _supertest["default"])(_app["default"])["delete"]("/api/sublocation/".concat(location.id)).end(function (_err, res) {
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Sub-Location does not exist');
        done();
      });
    });
    it.skip('should delete location',
    /*#__PURE__*/
    function () {
      var _ref7 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(done) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                (0, _supertest["default"])(_app["default"])["delete"]("/api/sublocation/".concat(location.id)).end(function (_err, res) {
                  expect(res.statusCode).toEqual(500);
                  expect(res.body.message).toEqual('Location does not exist');
                  done();
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x4) {
        return _ref7.apply(this, arguments);
      };
    }());
  });
});
//# sourceMappingURL=sub-location.test.js.map