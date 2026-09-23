const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates in frontmatter are YYYY-MM-DD; parse by hand so time zones can't shift the day.
export function formatDate(isoDate: string, { withYear = true } = {}) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const short = `${day} ${MONTHS[month - 1]}`;
  return withYear ? `${short} ${year}` : short;
}
