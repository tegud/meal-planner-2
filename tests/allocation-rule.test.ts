import { DayAllocationRule } from '../lib/entities/allocation-rule';

describe('Allocation Rules', () => {
  describe('DayAllocationRule', () => {
    it('returns false if day is not in allowed list', () => expect(new DayAllocationRule(['Sunday'], []).matches(0)).toBeFalsy());
    
    it('returns true if day is in allowed list', () => expect(new DayAllocationRule(['Monday'], []).matches(0)).toBeTruthy());

    it('returns true if day is in allowed list, ignoring case', () => expect(new DayAllocationRule(['monday'], []).matches(0)).toBeTruthy());

    it('returns true if day doesn\'t match negated day', () => expect(new DayAllocationRule(['!Sunday'], []).matches(0)).toBeTruthy());

    it('returns false if day matches negated day', () => expect(new DayAllocationRule(['!Sunday'], []).matches(6)).toBeFalsy());
  });

  describe('Add to requiredTags', () => {
    it('adds the rules tags to the provided tags', () => {
      const existingRequiredTags = new Set(['One']);
      const rule = new DayAllocationRule([], ['Two']);
      expect(rule.addToRequiredTags(existingRequiredTags)).toEqual(new Set(['One', 'Two']));
    });
  });
});
