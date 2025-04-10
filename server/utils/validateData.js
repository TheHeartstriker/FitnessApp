export function validateData(data) {
  if (!Array.isArray(data)) {
    throw new Error("Data should be an array");
  }
  data.forEach((dataDict) => {
    if (typeof dataDict.Var !== `${dataDict.Type}`) {
      throw new Error(`Invalid type for ${dataDict.Var}`);
    }
  });
}

export function validateData(data, fieldTypes) {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array");
  }

  data.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Item at index ${index} is not an object`);
    }
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
