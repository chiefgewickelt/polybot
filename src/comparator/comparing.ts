interface Getter<T> {
  (o: T): number;
}

export function comparing<T>(getter: Getter<T>) {
  return (a: T, b: T) => getter(a) - getter(b);
}
