"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

/* eslint-disable no-underscore-dangle */

/* eslint-disable quote-props */
var transformingReturn = function transformingReturn(ret) {
  var transformObj = ret;
  delete transformObj.__v;
  transformObj.id = transformObj._id.toString();
  delete transformObj._id;
  return transformObj;
};

var SubLocationSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  maleCount: {
    type: Number,
    required: [true, 'Male count is required']
  },
  femaleCount: {
    type: Number,
    required: [true, 'Female count is required']
  },
  locationId: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Location',
    required: [true, 'Location ID is required']
  }
}, {
  toJSON: {
    virtuals: true,
    getters: true,
    transform: function transform(_doc, ret) {
      return transformingReturn(ret);
    }
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: function transform(_doc, ret) {
      return transformingReturn(ret);
    }
  }
});
SubLocationSchema.index({
  'name': 1,
  'locationId': 1
}, {
  unique: true
});
SubLocationSchema.path('locationId').validate(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(value) {
    var locationCount;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].models.Location.countDocuments({
              _id: value
            });

          case 2:
            locationCount = _context.sent;
            return _context.abrupt("return", locationCount);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), 'Location with ID does not exists!');

var SubLocation = _mongoose["default"].model('SubLocation', SubLocationSchema);

var _default = SubLocation;
exports["default"] = _default;
//# sourceMappingURL=sub-location.js.map