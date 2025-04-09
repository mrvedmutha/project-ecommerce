import { FormFieldConfig } from "@/types/common/formField";

export async function parseFormData<T extends FormFieldConfig>(
  req: Request,
  config: T
): Promise<{
  [K in keyof T]: T[K] extends "string"
    ? string
    : T[K] extends "boolean"
    ? boolean
    : T[K] extends "file[]"
    ? File
    : T[K] extends "number"
    ? number
    : T[K] extends "buffer[]"
    ? Buffer
    : unknown;
}> {
  const formData = await req.formData();
  const parsedData: any = {};

  for (const key in config) {
    const type = config[key];
    const value = formData.get(key);
    const arrVal = formData.getAll(key);

    if (type === "string") {
      parsedData[key] = value as string;
    } else if (type === "boolean") {
      parsedData[key] = value === "true";
    } else if (type === "file[]") {
      parsedData[key] = arrVal as File[];
    } else if (type === "buffer[]") {
      const file = arrVal as File[];
      const buffers = await Promise.all(file.map((f) => f.arrayBuffer()));
      parsedData[key] = buffers;
    } else if (type === "number") {
      parsedData[key] = Number(value);
    }
  }

  return parsedData;
}
