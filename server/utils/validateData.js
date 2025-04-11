//
// Example:
// const var = 123;
// const data = [{ var}];
// const fieldTypes = [["var", "number"]];
// validateData(data, fieldTypes);

export function validateData(data, fieldTypes) {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array");
  }
  //iterates over data
  data.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Item at index ${index} is not an object`);
    }
    // Checks its name and type
    fieldTypes.forEach(([field, expectedType]) => {
      const value = item[field];
      if (value === undefined || value === null) {
        throw new Error(`Missing required field '${field}' at index ${index}`);
      }
      if (typeof value !== expectedType) {
        throw new Error(
          `Field '${field}' at index ${index} should be '${expectedType}', got '${typeof value}'`
        );
      }
    });
  });
}
