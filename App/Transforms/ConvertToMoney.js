export default (n, c, d, t) => {
  const nc = isNaN(Math.abs(c)) ? 2 : c
  const nd = d === undefined ? "." : d
  const nt = t === undefined ? "," : t
  const s = n < 0 ? "-" : ""
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(nc)))
  j = (j = i.length) > 3 ? j % 3 : 0

  return s + (j ? i.substr(0, j) + nt : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + nt) + (nc ? nd + Math.abs(n - i).toFixed(nc).slice(2) : "");
};
