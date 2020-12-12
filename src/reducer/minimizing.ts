interface Getter<T> {
  (o: T): number;
}

export function minimizing<T>(getter: Getter<T>) {
  return (curr: T | null, next: T) => {
    if (curr === null) return next;
    return getter(next) < getter(curr) ? next : curr;
  };
}
