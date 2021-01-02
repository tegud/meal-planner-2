import { getMeals, Meal, DayAllocationRule } from '../lib/index';

describe('get meals', () => {
  describe('when there are no meals defined', () => {
    it('should return every day as unassigned', () => {
      expect(getMeals()).toEqual([
        { day: 0, meal: { name: 'unassigned', tags: []} },
        { day: 1, meal: { name: 'unassigned', tags: []} },
        { day: 2, meal: { name: 'unassigned', tags: []} },
        { day: 3, meal: { name: 'unassigned', tags: []} },
        { day: 4, meal: { name: 'unassigned', tags: []} },
        { day: 5, meal: { name: 'unassigned', tags: []} },
        { day: 6, meal: { name: 'unassigned', tags: []} },
      ]);
    });
  });

  describe('when a single meal has been defined', () => {
    it('should assign it to every day', () => {
      const burger = new Meal({ name: 'Burgers' });

      expect(getMeals([burger])).toEqual([
        { day: 0, meal: burger },
        { day: 1, meal: burger },
        { day: 2, meal: burger },
        { day: 3, meal: burger },
        { day: 4, meal: burger },
        { day: 5, meal: burger },
        { day: 6, meal: burger },
      ]);
    });
  });

  describe('allocation rules are used', () => {
   describe('day rules', () => {
     it('should select meals based on day rule restrictions', () => {
      const burger = new Meal({ name: 'Burgers' });
      const roast = new Meal({ name: 'Roast', tags: ['sunday'] });

      expect(getMeals([
        burger,
        roast,
      ], [
        new DayAllocationRule(['!sunday'], ['!sunday']),
        new DayAllocationRule(['sunday'], ['sunday']),
      ])).toEqual([
        { day: 0, meal: burger },
        { day: 1, meal: burger },
        { day: 2, meal: burger },
        { day: 3, meal: burger },
        { day: 4, meal: burger },
        { day: 5, meal: burger },
        { day: 6, meal: roast },
      ]);
     });
   });
  });
});
