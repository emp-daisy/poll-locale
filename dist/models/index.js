"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connection = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _location = _interopRequireDefault(require("./location"));

var _subLocation = _interopRequireDefault(require("./sub-location"));

var connection = function connection() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

exports.connection = connection;
var models = {
  Location: _location["default"],
  SubLocation: _subLocation["default"]
};
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map