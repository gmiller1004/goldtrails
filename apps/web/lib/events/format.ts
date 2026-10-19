type EventDates = {
  eventStartDate?: string | null;
  eventEndDate?: string | null;
  eventDate?: string | null;
};

export function formatEventDate(value?: string | null, month: "short" | "long" = "short"): string | null {
  if (!value) return null;
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let parsed: Date;
  if (dateOnly) {
    const [, year, monthPart, day] = dateOnly;
    parsed = new Date(Number(year), Number(monthPart) - 1, Number(day));
  } else {
    parsed = new Date(value);
  }
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month, day: "numeric", year: "numeric" }).format(parsed);
}

export function formatEventDateRange(event: EventDates, month: "short" | "long" = "short"): string | null {
  const start = formatEventDate(event.eventStartDate, month);
  const end = formatEventDate(event.eventEndDate, month);
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (end) return end;
  return formatEventDate(event.eventDate, month);
}
