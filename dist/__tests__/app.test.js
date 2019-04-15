"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

describe('Entry Route', function () {
  it('should call the entry route', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/').expect(404, {
      message: 'URL not found!'
    }).end(function (err) {
      if (err) throw done(err);
      done();
    });
  });
});
//# sourceMappingURL=app.test.js.map