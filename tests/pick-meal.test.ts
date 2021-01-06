import { pickMeal } from '../lib/pick-meal';
import { Meal } from '../lib/entities/meal';
import { MealAllocationForDay } from '../lib/entities/meal-allocation';
import { DayOfWeek } from '../lib/entities/day-of-week';

describe('pickMeal', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });

  afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('returns unassigned if no possible meals provided', () => {
    expect(pickMeal([], []).name).toEqual('unassigned');
  });
  
  it('returns first meal option if only one available', () => {
    const burgers = new Meal({ name: 'Burgers' });
    expect(pickMeal([], [burgers])).toEqual(burgers);
  });
  
  it('returns random meal option if more than one available and no historic meals', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    const burgers = new Meal({ name: 'Burgers' });
    const hotdogs = new Meal({ name: 'Hotdogs' });

    expect(pickMeal([], [burgers, hotdogs])).toEqual(hotdogs);
  });
  
  it('returns other option if two meals and historic meals contains one item', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    const burgers = new Meal({ name: 'Burgers' });
    const hotdogs = new Meal({ name: 'Hotdogs' });

    const lastAllocatedMeal = new MealAllocationForDay({ day: DayOfWeek.Sunday, meal: hotdogs })

    expect(pickMeal([lastAllocatedMeal], [burgers, hotdogs])).toEqual(burgers);
  });
  
  it.skip('returns the least recently used if historic meals contains both items', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    const burgers = new Meal({ name: 'Burgers' });
    const hotdogs = new Meal({ name: 'Hotdogs' });

    const previousMeals = [
      new MealAllocationForDay({ day: DayOfWeek.Sunday, meal: burgers }),
      new MealAllocationForDay({ day: DayOfWeek.Sunday, meal: hotdogs }),
    ];

    expect(pickMeal(previousMeals, [burgers, hotdogs])).toEqual(burgers);
  });
});
