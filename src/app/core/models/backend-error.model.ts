import { ValidationErrorField } from "./validation-error-fields.model";

export interface BackendError {
  code: string;
  status: number;
  message: string;
  fields: ValidationErrorField[];
}
