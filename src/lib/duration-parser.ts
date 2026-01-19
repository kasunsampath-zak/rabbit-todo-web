/**
 * Jira-style duration parser
 * Parses duration strings like "2h 30m", "1d 4h", "30m", etc.
 * Converts them to minutes for calculations
 */

export interface ParsedDuration {
  days: number;
  hours: number;
  minutes: number;
  totalMinutes: number;
}

/**
 * Parse a Jira-style duration string (e.g., "2h 30m", "1d 4h", "30m")
 * @param duration - Duration string to parse
 * @returns ParsedDuration object
 */
export function parseDuration(duration: string): ParsedDuration {
  const result: ParsedDuration = {
    days: 0,
    hours: 0,
    minutes: 0,
    totalMinutes: 0,
  };

  if (!duration || typeof duration !== 'string') {
    return result;
  }

  // Match patterns like "2d", "4h", "30m"
  const dayMatch = duration.match(/(\d+)d/);
  const hourMatch = duration.match(/(\d+)h/);
  const minuteMatch = duration.match(/(\d+)m/);

  if (dayMatch) {
    result.days = parseInt(dayMatch[1], 10);
  }
  if (hourMatch) {
    result.hours = parseInt(hourMatch[1], 10);
  }
  if (minuteMatch) {
    result.minutes = parseInt(minuteMatch[1], 10);
  }

  // Calculate total minutes (assuming 8 hours per day)
  result.totalMinutes = result.days * 8 * 60 + result.hours * 60 + result.minutes;

  return result;
}

/**
 * Convert minutes to Jira-style duration string
 * @param minutes - Total minutes
 * @returns Duration string (e.g., "2h 30m")
 */
export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) {
    return '0m';
  }

  const days = Math.floor(minutes / (8 * 60));
  const remainingMinutes = minutes % (8 * 60);
  const hours = Math.floor(remainingMinutes / 60);
  const mins = remainingMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);

  return parts.join(' ') || '0m';
}

/**
 * Add two duration strings
 * @param duration1 - First duration string
 * @param duration2 - Second duration string
 * @returns Sum as duration string
 */
export function addDurations(duration1: string, duration2: string): string {
  const d1 = parseDuration(duration1);
  const d2 = parseDuration(duration2);
  return formatDuration(d1.totalMinutes + d2.totalMinutes);
}

/**
 * Subtract two duration strings
 * @param duration1 - First duration string
 * @param duration2 - Second duration string
 * @returns Difference as duration string
 */
export function subtractDurations(duration1: string, duration2: string): string {
  const d1 = parseDuration(duration1);
  const d2 = parseDuration(duration2);
  const diff = Math.max(0, d1.totalMinutes - d2.totalMinutes);
  return formatDuration(diff);
}
