import { useMemo } from 'react';
import { parseDuration, formatDuration, addDurations, subtractDurations } from '@/lib/duration-parser';

/**
 * Custom hook for working with Jira-style durations
 * Provides utilities to parse, format, and manipulate duration strings
 */
export function useJiraDuration() {
  const utils = useMemo(() => ({
    /**
     * Parse a Jira-style duration string (e.g., "2h 30m", "1d 4h")
     * @param duration - Duration string to parse
     * @returns Parsed duration object with days, hours, minutes, and totalMinutes
     */
    parse: parseDuration,

    /**
     * Format minutes into a Jira-style duration string
     * @param minutes - Total minutes
     * @returns Duration string (e.g., "2h 30m")
     */
    format: formatDuration,

    /**
     * Add two duration strings
     * @param duration1 - First duration string
     * @param duration2 - Second duration string
     * @returns Sum as duration string
     */
    add: addDurations,

    /**
     * Subtract two duration strings
     * @param duration1 - First duration string (minuend)
     * @param duration2 - Second duration string (subtrahend)
     * @returns Difference as duration string
     */
    subtract: subtractDurations,

    /**
     * Convert duration string to total minutes
     * @param duration - Duration string
     * @returns Total minutes
     */
    toMinutes: (duration: string): number => {
      return parseDuration(duration).totalMinutes;
    },

    /**
     * Validate if a duration string is valid
     * @param duration - Duration string to validate
     * @returns True if valid, false otherwise
     */
    isValid: (duration: string): boolean => {
      if (!duration || typeof duration !== 'string') return false;
      const parsed = parseDuration(duration);
      return parsed.totalMinutes > 0;
    },

    /**
     * Format duration in a human-readable way
     * @param duration - Duration string
     * @returns Human-readable string (e.g., "2 hours 30 minutes")
     */
    toHumanReadable: (duration: string): string => {
      const parsed = parseDuration(duration);
      const parts: string[] = [];
      
      if (parsed.days > 0) {
        parts.push(`${parsed.days} day${parsed.days > 1 ? 's' : ''}`);
      }
      if (parsed.hours > 0) {
        parts.push(`${parsed.hours} hour${parsed.hours > 1 ? 's' : ''}`);
      }
      if (parsed.minutes > 0) {
        parts.push(`${parsed.minutes} minute${parsed.minutes > 1 ? 's' : ''}`);
      }
      
      return parts.length > 0 ? parts.join(' ') : '0 minutes';
    },
  }), []);

  return utils;
}
