import { Meal } from '../lib/entities/meal';

describe('Meal', () => {
  describe('hasRequiredTags', () => {
    it('returns false if tags do not match', () => expect(new Meal({ name: 'test', tags: [] }).hasRequiredTags(new Set<string>(['one']))).toBeFalsy());

    it('returns true if single tag matches', () => expect(new Meal({ name: 'test', tags: ['one'] }).hasRequiredTags(new Set<string>(['one']))).toBeTruthy());

    it('returns true if single tag matches and meal has multiple', () => expect(new Meal({ name: 'test', tags: ['one', 'two'] }).hasRequiredTags(new Set<string>(['one']))).toBeTruthy());

    it('returns true if single tag matches ignoring case', () => expect(new Meal({ name: 'test', tags: ['One'] }).hasRequiredTags(new Set<string>(['oNe']))).toBeTruthy());
  
    it('returns true if inverse tag is not on meal', () => expect(new Meal({ name: 'test', tags: ['one'] }).hasRequiredTags(new Set<string>(['!two']))).toBeTruthy());
  });

  // describe('Add to requiredTags', () => {
  //   it('adds the rules tags to the provided tags', () => {
  //     const existingRequiredTags = new Set(['One']);
  //     const rule = new DayAllocationRule([], ['Two']);
  //     expect(rule.addToRequiredTags(existingRequiredTags)).toEqual(new Set(['One', 'Two']));
  //   });
  // });
});
