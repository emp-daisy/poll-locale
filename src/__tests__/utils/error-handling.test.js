import ErrorHandling from '../../utils/error-handling';

describe('Error Handling Util', () => {
  it('should return null for generic error', () => {
    const errorMessage = ErrorHandling(new Error('Generic error'));
    expect(errorMessage).toEqual(['Error completing request!']);
  });
});
