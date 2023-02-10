const isSubset = (obj1, obj2) => {
  for (const property in obj1) {
    if (!obj2.hasOwnProperty(property) || obj2[property] !== obj1[property]) {
      return false;
    }
  }
  return true;
}

const isObject = (field) => {
  return typeof field === "object" && field !== null;
}

const isValidInput = (field) => {
  return typeof field === 'number' || typeof field === 'string';
}

module.exports = {
  isSubset,
  isObject,
  isValidInput
};