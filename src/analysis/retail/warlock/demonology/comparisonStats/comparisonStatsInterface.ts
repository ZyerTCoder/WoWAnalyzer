export interface ComparisonStat {
  icon: string;
  sort: number;
  name: string;
  first: {
    name: string;
    value: number;
    valueDesignator: string;
    top?: number;
  };
  second: {
    name: string;
    value: number;
    valueDesignator: string;
    top?: number;
  };
}

export interface HasComparisonStat {
  comparisonStat: ComparisonStat[];
}

export function instanceOfComparisonStat(object: any): object is HasComparisonStat {
  return 'comparisonStat' in object;
}
