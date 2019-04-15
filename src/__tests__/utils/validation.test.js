import { isMongoId } from '../../utils/validation';

describe('Validation Util', () => {
  it('should pass for valid id', () => {
    const id = '5cb0a6a05f1e75403d473d8f';
    const isValid = isMongoId(id);
    expect(isValid).toEqual(true);
  });
  it('should fail for valid id', () => {
    const id = 'invalid123';
    const isValid = isMongoId(id);
    expect(isValid).toEqual(false);
  });
});
