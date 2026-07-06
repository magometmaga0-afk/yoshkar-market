export const PICKUP_ADDRESS = "ул. Соловьева, 45";

export const MIN_ORDER_AMOUNT = 3000;

export const WORKING_HOURS = { start: 8, end: 23 };

function getMoscowHour(date: Date = new Date()): number {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Moscow",
    hour: "numeric",
    hourCycle: "h23",
  });
  return parseInt(formatter.format(date), 10);
}

export function isWithinWorkingHours(date: Date = new Date()): boolean {
  const hour = getMoscowHour(date);
  return hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end;
}
