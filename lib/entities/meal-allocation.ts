import { DayOfWeek } from './day-of-week';
import { MealOption } from './meal';

interface MealAllocation {
  day: DayOfWeek,
  meal: MealOption,
}

class MealAllocationForDay implements MealAllocation {
  day: DayOfWeek;

  meal: MealOption;

  constructor({ day, meal } : { day: DayOfWeek, meal: MealOption }) {
    this.day = day;
    this.meal = meal;
  }
}

export { MealAllocation, MealAllocationForDay };
