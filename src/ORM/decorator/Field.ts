import { DataType } from "../DataType";

interface IField {
  type: DataType;
  length?: number;
}

export function Field(property: IField) {
  return function (target: any, propertyKey: string) {
    const prev = target._field;
    Object.defineProperty(target, "_field", {
      value: {
        ...prev,
        [propertyKey]: property
      },
      configurable: true
    });
  };
}
