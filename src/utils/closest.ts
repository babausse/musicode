export function closest(list: Array<any>, item: number): any {
  return list.reduce(function(prev, curr) {
    return (Math.abs(curr.f - item) < Math.abs(prev.f - item) ? curr : prev);
  });
}