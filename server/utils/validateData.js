//
// Example:
// const var = 123;
// const data = [{ var}];
// const fieldTypes = [["var", "number"]];
// validateData(data, fieldTypes);

export function validateData(data, fieldTypes) {
  if (!Array.isArray(data)) {
    const error = new Error("Data must be an array");
    console.error(error.stack);
    throw error;
  }
  // Iterates over data
  data.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      const error = new Error(`Item at index ${index} is not an object`);
      console.error(error.stack);
      throw error;
    }
    // Checks its name and type
    fieldTypes.forEach(([field, expectedType]) => {
      const value = item[field];
      if (value === undefined || value === null) {
        const error = new Error(
          `Missing required field '${field}' at index ${index}`
        );
        console.error(error.stack);
        throw error;
      }
      if (typeof value !== expectedType) {
        const error = new Error(
          `Field '${field}' at index ${index} should be '${expectedType}', got '${typeof value}'`
        );
        console.error(error.stack);
        throw error;
      }
    });
  });
}
// Checks if the length of the values is valid
// Example:
// const valArr = ["hi", "hello"];

export function isValidLength(valArr, lengthArr) {
  for (let i = 0; i < valArr.length; i++) {
    if (valArr[i].length > lengthArr[i]) {
      throw new Error(
        `Invalid length for ${valArr[i]}: expected less than ${lengthArr[i]}, got ${valArr[i].length}`
      );
    }
  }
}
