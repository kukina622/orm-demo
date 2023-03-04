import { DataType } from "../DataType";

export function Field({ type }: { type: DataType }) {
  return function (target: any, propertyKey: string) {
    console.log(type);
    console.log(target);
    console.log(propertyKey);
  };
}
