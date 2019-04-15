"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../controllers");

var _validation = _interopRequireDefault(require("../utils/validation"));

var router = require('express').Router();

router.get('/', _controllers.LocationController.getLocation);
router.get('/:search', _controllers.LocationController.getOneLocation);
router.post('/', _controllers.LocationController.addLocation);
router.put('/:id', _validation["default"].validateId, _controllers.LocationController.updateLocation);
router["delete"]('/:id', _validation["default"].validateId, _controllers.LocationController.deleteLocation);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=location.js.map