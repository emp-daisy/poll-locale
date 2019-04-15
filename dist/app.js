"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])(); // parse application/x-www-form-urlencoded

app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // parse application/json

app.use(_bodyParser["default"].json());
(0, _routes["default"])(app); // Wild card

app.all('*', function (_req, res) {
  res.status(404).json({
    message: 'URL not found!'
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map