import { Meal, MealOption } from './entities/meal';
import { MealAllocationForDay, MealAllocation } from './entities/meal-allocation';

const UNASSIGNED_MEAL = new Meal({ name: 'unassigned' });

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
}

const pickMeal = (previousMeals: MealAllocation[], mealOptions: MealOption[]): MealOption => {
  if (mealOptions.length < 1) {
    return UNASSIGNED_MEAL;
  }

  if (mealOptions.length === 1) {
    return mealOptions[0];
  }

  const unusedMeals = mealOptions.filter(option => !previousMeals.map(meal => meal.meal.name).includes(option.name));

  if (unusedMeals.length > 0) {
    return unusedMeals[getRandomInt(unusedMeals.length)];
  }

  return previousMeals[0].meal;
};

export { pickMeal };
