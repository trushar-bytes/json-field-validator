import { validateJsonField } from '../src/index';
import { ValidationConfig } from '../src/validation/string-validation';

interface JsonData {
  value: string | number;
  fieldName: string;
  validationConfig: ValidationConfig;
  errors: object;
}
test('Check is string and return true', () => {
  const json: JsonData[] = [
    {
      "value": "test",
      "fieldName": "email",
      "validationConfig": {
        isString: true,
      },
      errors: {
        isString: 'Please enter valid string'
      }
    }
  ]
  const result: any = validateJsonField(json)

  expect(result?.isValid).toBe(true);
});