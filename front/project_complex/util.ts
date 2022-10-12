export function getRatio(height: unknown,
                         baseArea: unknown
): string {
  const h = typeof height === 'string' ? +height : height;
  const b = typeof baseArea === 'string' ? +baseArea : baseArea;
  if (typeof h !== 'number' || typeof b !== 'number') {
    return '-';
  }
  if (Number.isNaN(h) || Number.isNaN(b)) {
    return '-';
  }
  if (h <= 0 || b <= 0) {
    return '-';
  }

  const ratio = h / Math.sqrt(b);
  return ratio.toFixed(4);
}