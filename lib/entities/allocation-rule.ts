import { DayOfWeek } from './day-of-week';

interface AllocationRule {
  addToRequiredTags(existingRequiredTags: Set<string>): Set<string>;

  matches(day: DayOfWeek): boolean;
}

class DayAllocationRule implements AllocationRule {
  private days: string[];

  private tags: string[];

  constructor(days: string[], tags: string[]) {
    this.days = days.map((day) => day.toLowerCase());
    this.tags = tags;
  }

  matches(day: DayOfWeek): boolean {
    return this.days.filter((ruleDay: string) => {
      if (ruleDay.startsWith('!')) {
        return ruleDay.substring(1) !== DayOfWeek[day].toLowerCase();
      }

      return ruleDay === DayOfWeek[day].toLowerCase();
    }).length > 0;
  }

  addToRequiredTags(existingRequiredTags: Set<string>): Set<string> {
    return new Set([...existingRequiredTags, ...this.tags]);
  }
}

export { AllocationRule, DayAllocationRule };
