export interface ComparisonStat {
  name: string;
  value: string | number;
  relevance: RELEVANCE_CATEGORY;
}

export interface HasComparisonStat {
  comparisonStat: ComparisonStat[];
}

export function instanceOfComparisonStat(object: any): object is HasComparisonStat {
  return 'comparisonStat' in object;
}

export const enum RELEVANCE_CATEGORY {
  CORE = 1,
  OTHER = 4,
  EXTRA = 10,
}
