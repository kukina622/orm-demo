import { DataModel } from "../DataModel";
import { getDataTypeNameByValue } from "../DataType";

export function createTableParser(dataModelRef: typeof DataModel) {
  const field = dataModelRef.prototype._field;
  const tableName = dataModelRef.name;
  let statement = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
  for (const fieldName in field) {
    statement += getColumnInfo(fieldName, field[fieldName]) + ", ";
  }
  statement = statement.slice(0, -2);
  statement += ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
  return statement;
}

function getColumnInfo(fieldName: String, fieldInfo: any) {
  const dataType: String = getDataTypeNameByValue(fieldInfo.type);
  let statement = `${fieldName} ${dataType}`;
  if (fieldInfo.length !== undefined) {
    statement += `(${fieldInfo.length})`;
  }
  if (fieldInfo.PK) {
    statement += " PRIMARY KEY";
  }
  return statement;
}
