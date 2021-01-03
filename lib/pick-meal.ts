import { Meal, MealOption } from './entities/meal';
import { MealAllocationForDay, MealAllocation } from './entities/meal-allocation';

const UNASSIGNED_MEAL = new Meal({ name: 'unassigned' });

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
}

class ScoredMeal extends Meal {
  score: number;

  constructor(meal: Meal, score: number) {
    super(meal);

    this.score = score;
  }
}

const pickMeal = (previousMeals: MealAllocation[], mealOptions: MealOption[]): MealOption => {
  if (mealOptions.length < 1) {
    return UNASSIGNED_MEAL;
  }

  if (mealOptions.length === 1) {
    return mealOptions[0];
  }

  const scoredMeals = mealOptions.map(option => {
    const isUnused = !previousMeals.map(meal => meal.meal.name).includes(option.name);
    const proximityScore = isUnused ? 100 : 0;

    return new ScoredMeal(option, proximityScore);
  });

  const topScore = scoredMeals.reduce((max, current): number => {
    if (current.score > max) {
      return current.score;
    }

    return max;
  }, 0);

  const optionsMatchingTopScore = scoredMeals.filter((current) => current.score === topScore);

  if (optionsMatchingTopScore.length > 0) {
    return optionsMatchingTopScore[getRandomInt(optionsMatchingTopScore.length)];
  }

  return previousMeals[0].meal;
};

export { pickMeal };
