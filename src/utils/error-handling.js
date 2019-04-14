const ErrorHandling = (error) => {
  const { errors, name: errorName } = error;
  const errorArray = (errors) ? Object.values(errors) : [];
  let errorMessage;
  switch (errorName) {
    case 'ValidationError':
      errorMessage = errorArray.map((field) => {
        if (field.name === 'CastError') {
          return `Invalid value '${field.value}' passed for ${field.path}`;
        }
        return field.message;
      });
      break;
    case 'MongoError':
      errorMessage = errorArray.map(field => field.message);
      break;
    case 'CastError':
      errorMessage = [`Invalid value '${error.value}' passed for ${error.path}`];
      break;
    default:
      errorMessage = null;
      break;
  }
  return errorMessage;
};

export default ErrorHandling;
