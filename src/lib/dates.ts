/**
 * Date utilities for the temporal navigation
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function monthName(month: string | number): string {
  return MONTH_NAMES[Number(month) - 1] || '';
}

export function monthShort(month: string | number): string {
  return MONTH_SHORT[Number(month) - 1] || '';
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;
}

export function getDateParts(dateStr: string): { year: string; month: string; day: string } {
  const d = new Date(dateStr);
  return {
    year: String(d.getFullYear()),
    month: String(d.getMonth() + 1).padStart(2, '0'),
    day: String(d.getDate()).padStart(2, '0'),
  };
}

export function dayOfWeek(dateStr: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateStr).getDay()];
}
