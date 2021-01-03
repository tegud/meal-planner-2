import { Meal, MealOption } from './entities/meal';
import { MealAllocationForDay, MealAllocation } from './entities/meal-allocation';
import { AllocationRule, DayAllocationRule } from './entities/allocation-rule';
import { pickMeal } from './pick-meal';

const UNASSIGNED_MEAL = new Meal({ name: 'unassigned' });

const getMeals = (mealOptions: MealOption[] = [], allocationRules: AllocationRule[] = []) : MealAllocation[] => {
  return new Array(7).fill(undefined).map((x, i) => {
    const matchingAllocationRules = allocationRules.filter((rule) => rule.matches(i));

    const requiredTags = matchingAllocationRules.reduce((allTags: Set<string>, rule) => {
      return rule.addToRequiredTags(allTags);
    }, new Set<string>());

    const matchingMeals = mealOptions.reduce((matching, meal) => {
      if (meal.hasRequiredTags(requiredTags)) {
        matching.push(meal);
      }

      return matching;
    }, new Array<MealOption>());

    const meal = matchingMeals.length > 0 ? pickMeal([], matchingMeals) : UNASSIGNED_MEAL;

    return new MealAllocationForDay({ day: i, meal });
  });
};

export {
  getMeals,
  Meal,
  MealAllocationForDay,
  DayAllocationRule
};
