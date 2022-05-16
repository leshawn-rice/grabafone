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
  convertValue,
}