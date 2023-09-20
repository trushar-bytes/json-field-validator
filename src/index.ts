import { validateString, ValidationConfig } from './validation/string-validation'

interface JsonData {
  value: string | number;
  fieldName: string;
  validationConfig: ValidationConfig;
  errors: object;
}

export function validateJsonField(jsonData: JsonData[]): object {
  const errors: any = {};
  for (const item of jsonData) {
    if (!errors[item.fieldName]) {
      const { errorMessage, isValid } = validateString(item.value.toString(), item.validationConfig, item.errors);
      if (!isValid) {
        errors[item.fieldName] = errorMessage;
      }
    }
  }
  const isEmpty = Object.keys(errors).length === 0 && errors.constructor === Object;
  return { errors, isValid: isEmpty };
}