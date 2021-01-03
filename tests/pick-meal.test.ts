import { pickMeal } from '../lib/pick-meal';
import { Meal } from '../lib/entities/meal';
import { MealAllocationForDay } from '../lib/entities/meal-allocation';

describe('pickMeal', () => {
  let randomNumber: number;

  beforeEach(() => {
    randomNumber = 0;
    jest.spyOn(global.Math, 'random').mockReturnValue(0.52);
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
    const burgers = new Meal({ name: 'Burgers' });
    const hotdogs = new Meal({ name: 'Hotdogs' });
    randomNumber = 1;

    expect(pickMeal([], [burgers, hotdogs])).toEqual(hotdogs);
  });
  
  // it('returns random meal option if more than one available and no historic meals', () => {
  //   const burgers = new Meal({ name: 'Burgers' });
  //   const hotdogs = new Meal({ name: 'Hotdogs' });

  //   const lastAllocatedMeal = new MealAllocationForDay({ meal: hotdogs })

  //   expect(pickMeal([], [burgers, hotdogs])).toEqual(burgers);
  // });
});
