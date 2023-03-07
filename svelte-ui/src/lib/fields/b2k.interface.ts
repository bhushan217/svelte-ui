export type FieldType = "text" | "textarea" | "number"
 | "date" | "time" | "datetime"
 | "select" | "checkbox"
 | "object" | "array" | "object_array";
export interface Option {
  id:string | number;
  text: string
}
export interface B2kSchema {
  type: FieldType,
  label: string,
  options?: Array<Option>,
  schema?: B2kSchema,
  layout?: string
}