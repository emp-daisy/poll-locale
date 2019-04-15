"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _models = _interopRequireDefault(require("../models"));

var _errorHandling = _interopRequireDefault(require("../utils/error-handling"));

var _validation = require("../utils/validation");

var SubLocation = _models["default"].SubLocation;
var SubLocationController = {
  getSubLocation: function () {
    var _getSubLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_req, res) {
      var locations;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return SubLocation.find();

            case 2:
              locations = _context.sent;
              res.status(200).json({
                locations: locations,
                message: 'All sub-locations'
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getSubLocation(_x, _x2) {
      return _getSubLocation.apply(this, arguments);
    }

    return getSubLocation;
  }(),
  getOneSubLocation: function () {
    var _getOneSubLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref, res) {
      var search, searchObject, location;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              search = _ref.params.search;
              searchObject = (0, _validation.isMongoId)(search) ? {
                _id: search
              } : {
                name: new RegExp(search, 'i')
              };
              _context2.next = 4;
              return SubLocation.findOne(searchObject).populate('locationId').exec();

            case 4:
              location = _context2.sent;

              if (!(location === null)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                message: 'Sub-Location does not exist'
              }));

            case 7:
              location = location.toJSON({
                getters: false,
                virtuals: false
              });
              return _context2.abrupt("return", res.status(200).json({
                location: location,
                message: 'Sub-Location found'
              }));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getOneSubLocation(_x3, _x4) {
      return _getOneSubLocation.apply(this, arguments);
    }

    return getOneSubLocation;
  }(),
  addSubLocation: function () {
    var _addSubLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var _req$body, name, maleCount, femaleCount, locationId, newLocation, data, message;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, maleCount = _req$body.maleCount, femaleCount = _req$body.femaleCount, locationId = _req$body.locationId;
              newLocation = new SubLocation({
                name: name,
                maleCount: maleCount,
                femaleCount: femaleCount,
                locationId: locationId
              });
              _context3.prev = 2;
              _context3.next = 5;
              return newLocation.save();

            case 5:
              data = _context3.sent;
              return _context3.abrupt("return", res.status(201).json({
                location: data,
                message: 'New sub-location created'
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              message = (0, _errorHandling["default"])(_context3.t0);
              return _context3.abrupt("return", res.status(500).json({
                message: message
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 9]]);
    }));

    function addSubLocation(_x5, _x6) {
      return _addSubLocation.apply(this, arguments);
    }

    return addSubLocation;
  }(),
  updateSubLocation: function () {
    var _updateSubLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      var id, _req$body2, name, maleCount, femaleCount, locationId, location, message;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _req$body2 = req.body, name = _req$body2.name, maleCount = _req$body2.maleCount, femaleCount = _req$body2.femaleCount, locationId = _req$body2.locationId;
              _context4.prev = 2;
              _context4.next = 5;
              return SubLocation.findByIdAndUpdate(id, (0, _lodash.pickBy)({
                name: name,
                maleCount: maleCount,
                femaleCount: femaleCount,
                locationId: locationId
              }, _lodash.identity), {
                "new": true,
                runValidators: true
              });

            case 5:
              location = _context4.sent;

              if (!(location === null)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                message: 'Sub-Location does not exist'
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).json({
                location: location,
                message: 'Sub-Location updated'
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](2);
              message = (0, _errorHandling["default"])(_context4.t0);
              return _context4.abrupt("return", res.status(500).json({
                message: message
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 11]]);
    }));

    function updateSubLocation(_x7, _x8) {
      return _updateSubLocation.apply(this, arguments);
    }

    return updateSubLocation;
  }(),
  deleteSubLocation: function () {
    var _deleteSubLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res) {
      var id, location, deletedLocation, message;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.next = 3;
              return SubLocation.findById(id);

            case 3:
              location = _context5.sent;
              _context5.prev = 4;

              if (!(location == null)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Sub-Location does not exist'
              }));

            case 7:
              _context5.next = 9;
              return location.remove();

            case 9:
              deletedLocation = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                location: deletedLocation,
                message: 'Sub-Location deleted'
              }));

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](4);
              message = (0, _errorHandling["default"])(_context5.t0);
              return _context5.abrupt("return", res.status(500).json({
                message: message
              }));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 13]]);
    }));

    function deleteSubLocation(_x9, _x10) {
      return _deleteSubLocation.apply(this, arguments);
    }

    return deleteSubLocation;
  }()
};
var _default = SubLocationController;
exports["default"] = _default;
//# sourceMappingURL=sub-location.js.map