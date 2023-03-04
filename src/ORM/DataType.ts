export enum DataType {
  INT,
  VARCHAR,
  CHAR,
  DATETIME
}

export function getDataTypeNameByValue(v: number) {
  return DataType[v];
}
