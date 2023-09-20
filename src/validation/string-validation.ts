export interface ValidationConfig {
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
  isString?: boolean;
  isStringWithSpace?: boolean;
  allowSpecialChar?: boolean;
}

export interface ValidationError {
  isRequired?: string;
  minLength?: string;
  maxLength?: string;
  isEmail?: string;
  isNumeric?: string;
  isString?: string;
  isStringWithSpace?: string;
  allowSpecialChar?: string;
}

export interface ValidationResult {
  errorMessage: string;
  isValid: boolean;
}

export function validateString(value: string, validationConfig: ValidationConfig, errors: ValidationError): ValidationResult {

  if (!validationConfig) {
    return {
      errorMessage: 'Validation config is not provided',
      isValid: false
    };
  }

  // validation for isRequired

  if (validationConfig && validationConfig.isRequired === true && value.length === 0) {
    return {
      errorMessage: errors.isRequired ? errors.isRequired : 'This field is required',
      isValid: false
    }
  }

  if (validationConfig && validationConfig.isRequired === false) {
    return {
      errorMessage: '',
      isValid: true
    }
  }

  // validation for minLength and maxLength

  if (validationConfig.minLength && validationConfig.minLength && value.length < validationConfig.minLength) {
    return {
      errorMessage: errors.minLength ? errors.minLength : `Value should be greater than ${validationConfig.minLength}`,
      isValid: false
    }
  }

  if (validationConfig.maxLength && value.length > validationConfig.maxLength) {
    return {
      errorMessage: errors.maxLength ? errors.maxLength : `Value should not be greater than ${validationConfig.maxLength}`,
      isValid: false
    }
  }

  // validation for isEmail

  if (validationConfig.isEmail) {
    const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    if (!emailRegex.test(value)) {
      return {
        errorMessage: errors.isEmail ? errors.isEmail : 'Please enter valid email',
        isValid: false
      }
    }
  }
  // validation for isNumeric

  if (validationConfig.isNumeric) {
    const numericRegex = new RegExp('^[0-9]+$');
    if (!numericRegex.test(value)) {
      return {
        errorMessage: errors.isNumeric ? errors.isNumeric : 'Please enter valid number',
        isValid: false
      }
    }
  }

  // validation for isString
  if (validationConfig.isString) {
    const stringRegex = new RegExp('^[a-zA-Z]+$');
    if (!stringRegex.test(value)) {
      return {
        errorMessage: errors.isString ? errors.isString : 'Please enter valid string',
        isValid: false
      }
    }
  }

  // validation for isStringWithSpace

  if (validationConfig && validationConfig?.isStringWithSpace === true) {
    return {
      errorMessage: "",
      isValid: true
    }
  }

  if (validationConfig && validationConfig?.isStringWithSpace === false) {
    const regex = /^\S*$/;
    if (!regex.test(value)) {
      return {
        errorMessage: errors.isStringWithSpace ? errors.isStringWithSpace : 'Value should not contain space',
        isValid: false
      }
    }
  }

  // validation for allowSpecialChar

  if (validationConfig && validationConfig.allowSpecialChar === true) {
    return {
      errorMessage: "",
      isValid: true
    }
  }

  if (validationConfig && validationConfig.allowSpecialChar === false) {
    const stringRegex = new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]+$');
    if (!stringRegex.test(value)) {
      return {
        errorMessage: errors.allowSpecialChar ? errors.allowSpecialChar : 'Value should not contain special character',
        isValid: false
      }
    }
  }

  return {
    errorMessage: '',
    isValid: true
  };
}
