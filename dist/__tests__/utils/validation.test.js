"use strict";

var _validation = require("../../utils/validation");

describe('Validation Util', function () {
  it('should pass for valid id', function () {
    var id = '5cb0a6a05f1e75403d473d8f';
    var isValid = (0, _validation.isMongoId)(id);
    expect(isValid).toEqual(true);
  });
  it('should fail for valid id', function () {
    var id = 'invalid123';
    var isValid = (0, _validation.isMongoId)(id);
    expect(isValid).toEqual(false);
  });
});
//# sourceMappingURL=validation.test.js.map