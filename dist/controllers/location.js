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

var Location = _models["default"].Location;
var LocationController = {
  getLocation: function () {
    var _getLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_req, res) {
      var locations;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Location.find();

            case 2:
              locations = _context.sent;
              res.status(200).json({
                locations: locations,
                message: 'All locations'
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getLocation(_x, _x2) {
      return _getLocation.apply(this, arguments);
    }

    return getLocation;
  }(),
  getOneLocation: function () {
    var _getOneLocation = (0, _asyncToGenerator2["default"])(
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
              return Location.findOne(searchObject);

            case 4:
              location = _context2.sent;

              if (!(location === null)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                message: 'Location does not exist'
              }));

            case 7:
              return _context2.abrupt("return", res.status(200).json({
                location: location,
                message: 'Location found'
              }));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getOneLocation(_x3, _x4) {
      return _getOneLocation.apply(this, arguments);
    }

    return getOneLocation;
  }(),
  addLocation: function () {
    var _addLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var _req$body, name, description, data, message;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, description = _req$body.description;
              _context3.prev = 1;
              _context3.next = 4;
              return new Location({
                name: name,
                description: description
              }).save();

            case 4:
              data = _context3.sent;
              return _context3.abrupt("return", res.status(201).json({
                location: data,
                message: 'New location created'
              }));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              message = (0, _errorHandling["default"])(_context3.t0);
              return _context3.abrupt("return", res.status(500).json({
                message: message
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 8]]);
    }));

    function addLocation(_x5, _x6) {
      return _addLocation.apply(this, arguments);
    }

    return addLocation;
  }(),
  updateLocation: function () {
    var _updateLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      var id, _req$body2, name, description, location, message;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id, _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
              _context4.prev = 1;
              _context4.next = 4;
              return Location.findByIdAndUpdate(id, (0, _lodash.pickBy)({
                name: name,
                description: description
              }, _lodash.identity), {
                "new": true,
                runValidators: true
              });

            case 4:
              location = _context4.sent;

              if (!(location === null)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                message: 'Location does not exist'
              }));

            case 7:
              return _context4.abrupt("return", res.status(200).json({
                location: location,
                message: 'Location updated'
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);
              message = (0, _errorHandling["default"])(_context4.t0);
              return _context4.abrupt("return", res.status(500).json({
                message: message
              }));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 10]]);
    }));

    function updateLocation(_x7, _x8) {
      return _updateLocation.apply(this, arguments);
    }

    return updateLocation;
  }(),
  deleteLocation: function () {
    var _deleteLocation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res) {
      var id, location, message;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.prev = 1;
              _context5.next = 4;
              return Location.findOneAndDelete({
                _id: id
              });

            case 4:
              location = _context5.sent;

              if (!(location === null)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Location does not exist'
              }));

            case 7:
              return _context5.abrupt("return", res.status(200).json({
                location: location,
                message: 'Location deleted'
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              message = (0, _errorHandling["default"])(_context5.t0);
              return _context5.abrupt("return", res.status(500).json({
                message: message
              }));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 10]]);
    }));

    function deleteLocation(_x9, _x10) {
      return _deleteLocation.apply(this, arguments);
    }

    return deleteLocation;
  }()
};
var _default = LocationController;
exports["default"] = _default;
//# sourceMappingURL=location.js.map