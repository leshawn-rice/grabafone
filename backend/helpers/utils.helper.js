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

const getEpoch = () => {
  const now = new Date()  
  const epoch = Math.round(now.getTime() / 1000)
  return epoch;
}

const convertTimestamp = (timestamp) => {
  return timestamp.toUTCString();
}

module.exports = {
  convertValue,
  convertTimestamp,
  getEpoch,
}