import { DataModel } from "../DataModel";
interface Ifield {
  [key: string]: any;
}

export function insertParser<T>(
  field: Ifield,
  tableName: String,
  obj: T
): string {
  const columns: Array<String> = [];
  const values: Array<any> = [];

  for (const fieldName in field) {
    columns.push(fieldName);
    values.push(`"${(obj as any)[fieldName]}"`);
  }
  return `INSERT INTO ${tableName} (${columns.join(",")}) VALUES (${values.join(",")})`;
}
