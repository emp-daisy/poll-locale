"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

beforeAll(
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee3() {
  var clearDB;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          clearDB =
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee2() {
              var collections;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _mongoose["default"].connection.db.collections();

                    case 2:
                      collections = _context2.sent;
                      _context2.next = 5;
                      return collections.forEach(
                      /*#__PURE__*/
                      function () {
                        var _ref3 = (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee(collection) {
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return collection.deleteOne();

                                case 2:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x) {
                          return _ref3.apply(this, arguments);
                        };
                      }());

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            return function clearDB() {
              return _ref2.apply(this, arguments);
            };
          }();

          if (!(_mongoose["default"].connection.readyState === 0)) {
            _context3.next = 4;
            break;
          }

          _context3.next = 4;
          return _mongoose["default"].connect(process.env.TEST_DATABASE_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
          });

        case 4:
          _context3.next = 6;
          return clearDB();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
afterAll(
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee4() {
  return _regenerator["default"].wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _mongoose["default"].disconnect();

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
//# sourceMappingURL=setup.js.map