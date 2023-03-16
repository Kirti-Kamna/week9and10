export function getFormattedDate(date: {toISOString: () => string | any[]}) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: any, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
