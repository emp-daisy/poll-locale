const ErrorHandling = (error) => {
  const { errors, name: errorName, code } = error;
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
      if (code === 11000) { errorMessage.push('Similar entry already exists!'); }
      break;
    case 'CastError':
      errorMessage = [`Invalid value '${error.value}' passed for ${error.path}`];
      break;
    default:
      errorMessage = ['Error completing request!'];
      break;
  }
  return errorMessage;
};

export default ErrorHandling;
