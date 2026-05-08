/** 표시용 YYYY.MM.DD (로컬) */
export function formatDateDot(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/** 정산월 표시 YYYY.MM */
export function formatMonthDot(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}.${m}`;
}

/** 전월 1일 ~ 전월 말일 */
export function getPreviousMonthDateRange(): { start: string; end: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);
  return { start: formatDateDot(start), end: formatDateDot(end) };
}

/** 전월 단일 정산월 문자열 (시작=종료 동일 적용용) */
export function getPreviousMonthYYYYMM(): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return formatMonthDot(d);
}

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export function getWeekdayLabelsKo(): string[] {
  return [...WEEKDAYS_KO];
}

export type CalendarCell = {
  date: Date;
  /** 현재 표시 중인 월에 속하는 날인지 */
  inCurrentMonth: boolean;
};

/** 월 그리드 6주 × 7일, 앞뒤 패딩 포함 */
export function getMonthCells(year: number, monthIndex: number): CalendarCell[] {
  const first = new Date(year, monthIndex, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: CalendarCell[] = [];
  const padStart = startWeekday;
  for (let i = padStart; i > 0; i--) {
    const d = new Date(year, monthIndex, 1 - i);
    cells.push({ date: d, inCurrentMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, monthIndex, day), inCurrentMonth: true });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ date: new Date(year, monthIndex, daysInMonth + i), inCurrentMonth: false });
  }
  return cells;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBetweenDayInclusive(d: Date, from: Date, to: Date): boolean {
  const dd = new Date(d);
  dd.setHours(12, 0, 0, 0);
  const f = new Date(from);
  f.setHours(0, 0, 0, 0);
  const t = new Date(to);
  t.setHours(23, 59, 59, 999);
  return dd >= f && dd <= t;
}

/** from < d < to (당일 제외, 범위 중간 강조용) */
export function isStrictlyBetweenDays(d: Date, from: Date, to: Date): boolean {
  const a = new Date(from);
  const b = new Date(to);
  const lo = a <= b ? a : b;
  const hi = a <= b ? b : a;
  if (sameDay(d, lo) || sameDay(d, hi)) return false;
  return isBetweenDayInclusive(d, lo, hi);
}

export function parseDotDate(s: string): Date | null {
  const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
}

export function parseDotMonth(s: string): Date | null {
  const m = /^(\d{4})\.(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  return new Date(y, mo, 1);
}
