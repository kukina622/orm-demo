export function PK(target: any, propertyKey: string) {
  const prev = target._field;

  Object.defineProperty(target, "_field", {
    value: {
      ...prev,
      [propertyKey]: {
        ...prev[propertyKey],
        PK: true
      }
    },
    configurable: true
  });
}
