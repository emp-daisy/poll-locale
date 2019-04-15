"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default =
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var conn;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _mongoose["default"].connect(process.env.TEST_DATABASE_URL, {
            useCreateIndex: true,
            useNewUrlParser: true
          });

        case 2:
          conn = _context.sent;
          _context.next = 5;
          return conn.connection.db.dropDatabase();

        case 5:
          process.exit();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

exports["default"] = _default;
//# sourceMappingURL=teardown.js.map