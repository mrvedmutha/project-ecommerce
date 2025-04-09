type FormField =
  | "string"
  | "boolean"
  | "file[]"
  | "buffer[]"
  | "number"
  | "string[]";
export interface FormFieldConfig {
  [key: string]: FormField;
}
