"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isMongoId = void 0;

var _validator = _interopRequireDefault(require("validator"));

var Middleware = {
  validateId: function validateId(req, res, next) {
    if (!_validator["default"].isMongoId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid id parameter'
      });
    }

    return next();
  }
};

var isMongoId = function isMongoId(id) {
  return _validator["default"].isMongoId(id);
};

exports.isMongoId = isMongoId;
var _default = Middleware;
exports["default"] = _default;
//# sourceMappingURL=validation.js.map