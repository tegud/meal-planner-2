interface MealOption {
  name: string,
  tags: string[],
  hasRequiredTags(requiredTags: Set<string>): boolean,
}

class Meal implements MealOption {
  name: string;

  tags: string[];

  constructor({ name, tags = [] } : { name: string, tags?: string[] }) {
    this.name = name;
    this.tags = tags.map((tag) => tag.toLowerCase());
  }

  hasRequiredTags(requiredTags: Set<string>): boolean {
    return [...requiredTags]
      .map((tag) => tag.toLowerCase())
      .reduce((result: boolean, currentRequiredTag): boolean => {
        if (!result) {
          return false;
        }

        const inverseRule = currentRequiredTag.startsWith('!');

        if ((inverseRule && this.tags.includes(currentRequiredTag.substring(1)))
          || (!inverseRule && !this.tags.includes(currentRequiredTag))) {
          return false;
        }

        return result;
      }, true);
  }
}

export { MealOption, Meal };
