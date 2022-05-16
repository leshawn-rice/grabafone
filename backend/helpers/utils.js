
const ensureHasAPIKey = async (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const key = authHeader.replace(/^[Bb]earer /, '').trim();
      if (!key) {
        throw new BadRequestError('Include API Key in authorization header in format `Bearer <API_KEY>`');
      }
      const isKeyValid = await Key.validate_key(key);
      if (!isKeyValid) {
        throw new UnauthorizedError('Invalid API Key!');
      }
    }
    else {
      throw new BadRequestError('Include API Key in authorization header in format `Bearer <API_KEY>`');
    }
    return;
  }
  catch (err) {
    throw err;
  }
}

const convertValue = (value=undefined) => {
  let newValue;
  switch (value) {
    case !isNaN(value):
      newValue = parseFloat(value);
      break
    default:
      newValue = value;
  }
  return newValue;
} 

module.exports = {
  ensureHasAPIKey,
  convertValue,
}