export function fmt(tpl: string, a: number, b: number) {
  return tpl.replace("{a}", String(a)).replace("{b}", String(b));
}
