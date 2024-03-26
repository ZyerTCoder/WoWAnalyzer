export interface ComparisonStat {
  icon: string;
  name: string;
  value: number;
  valueDesignator: string;
  sort: number;
  top?: number;
}

export interface HasComparisonStat {
  comparisonStat: ComparisonStat[];
}

export function instanceOfComparisonStat(object: any): object is HasComparisonStat {
  return 'comparisonStat' in object;
}
