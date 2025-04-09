type FormField = "string" | "boolean" | "file[]" | "buffer[]" | "number";
export interface FormFieldConfig {
  [key: string]: FormField;
}
