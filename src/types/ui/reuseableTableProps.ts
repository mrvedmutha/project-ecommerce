import { ColumnDef } from "@tanstack/react-table";
export interface ITableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  model: string;
  divClassName?: string;
  captionLink?: string;
  captionText?: string;
}
