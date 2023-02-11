export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x.points);
    return rv;
  }, {});
}
