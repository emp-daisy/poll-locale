"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ErrorHandling = function ErrorHandling(error) {
  var errors = error.errors,
      errorName = error.name,
      code = error.code;
  var errorArray = errors ? Object.values(errors) : [];
  var errorMessage;

  switch (errorName) {
    case 'ValidationError':
      errorMessage = errorArray.map(function (field) {
        if (field.name === 'CastError') {
          return "Invalid value '".concat(field.value, "' passed for ").concat(field.path);
        }

        return field.message;
      });
      break;

    case 'MongoError':
      errorMessage = errorArray.map(function (field) {
        return field.message;
      });

      if (code === 11000) {
        errorMessage.push('Similar entry already exists!');
      }

      break;

    case 'CastError':
      errorMessage = ["Invalid value '".concat(error.value, "' passed for ").concat(error.path)];
      break;

    default:
      errorMessage = ['Error completing request!'];
      break;
  }

  return errorMessage;
};

var _default = ErrorHandling;
exports["default"] = _default;
//# sourceMappingURL=error-handling.js.map