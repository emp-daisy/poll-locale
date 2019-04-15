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
var transformingReturn = function transformingReturn(ret) {
  var transformObj = ret;
  delete transformObj.__v;
  transformObj.id = transformObj._id.toString();
  delete transformObj._id;

  if (transformObj.subLocations) {
    transformObj.maleCount = transformObj.subLocations.reduce(function (sum, _ref) {
      var maleCount = _ref.maleCount;
      return sum + maleCount;
    }, 0);
    transformObj.femaleCount = transformObj.subLocations.reduce(function (sum, _ref2) {
      var femaleCount = _ref2.femaleCount;
      return sum + femaleCount;
    }, 0);
    transformObj.totalCount = transformObj.maleCount + transformObj.femaleCount;
  }

  return transformObj;
};

var LocationSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  description: {
    type: String
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
LocationSchema.path('name').validate(
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(value) {
    var nameCount;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].models.Location.countDocuments({
              name: value
            });

          case 2:
            nameCount = _context.sent;
            return _context.abrupt("return", !nameCount);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}(), 'Location name already exists!');
LocationSchema.pre('find', function find() {
  this.populate('subLocations');
});
LocationSchema.pre('findOne', function findOne() {
  this.populate('subLocations').populate('maleCount').populate('femaleCount');
});
LocationSchema.post('findOneAndDelete',
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(location, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(location !== null)) {
              _context2.next = 3;
              break;
            }

            _context2.next = 3;
            return _mongoose["default"].models.SubLocation.deleteMany({
              locationId: location.id
            });

          case 3:
            next();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}()); // LocationSchema.statics.getSubLocation = function getSubLocation(id, callback) {
//   return mongoose.models.Location.findById(id, callback);
// };

LocationSchema.virtual('subLocations', {
  ref: 'SubLocation',
  localField: '_id',
  foreignField: 'locationId',
  justOne: false
});

var Location = _mongoose["default"].model('Location', LocationSchema);

var _default = Location;
exports["default"] = _default;
//# sourceMappingURL=location.js.map