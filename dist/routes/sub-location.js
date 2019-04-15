"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../controllers");

var _validation = _interopRequireDefault(require("../utils/validation"));

var router = require('express').Router();

router.get('/', _controllers.SubLocationController.getSubLocation);
router.get('/:search', _controllers.SubLocationController.getOneSubLocation);
router.post('/', _controllers.SubLocationController.addSubLocation);
router.put('/:id', _validation["default"].validateId, _controllers.SubLocationController.updateSubLocation);
router["delete"]('/:id', _validation["default"].validateId, _controllers.SubLocationController.deleteSubLocation);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=sub-location.js.map