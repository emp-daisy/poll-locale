"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _errorHandling = _interopRequireDefault(require("../../utils/error-handling"));

describe('Error Handling Util', function () {
  it('should return null for generic error', function () {
    var errorMessage = (0, _errorHandling["default"])(new Error('Generic error'));
    expect(errorMessage).toEqual(['Error completing request!']);
  });
});
//# sourceMappingURL=error-handling.test.js.map