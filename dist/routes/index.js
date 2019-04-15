"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _location = _interopRequireDefault(require("./location"));

var _subLocation = _interopRequireDefault(require("./sub-location"));

var documentation = require('../utils/documentation.json');

var routes = function routes(app) {
  app.use('/api/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(documentation));
  app.use('/api/location', _location["default"]);
  app.use('/api/sublocation', _subLocation["default"]);
};

var _default = routes;
exports["default"] = _default;
//# sourceMappingURL=index.js.map