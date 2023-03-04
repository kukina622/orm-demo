import { DataModel } from "../DataModel";
import { getDataTypeNameByValue } from "../DataType";

export function createTableParser(dataModelRef: typeof DataModel) {
  const field = dataModelRef.prototype._field;
  const tableName = dataModelRef.name;
  let statement = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
  for (const fieldName in field) {
    statement += getColumnInfo(fieldName, field[fieldName]) + ", ";
  }
  statement = statement = statement.slice(0, -1);
  statement += ");";
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