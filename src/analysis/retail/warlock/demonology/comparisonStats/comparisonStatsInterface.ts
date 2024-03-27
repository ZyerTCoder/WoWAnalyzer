import { formatNumber, formatPercentage } from 'common/format';

interface SmallStat {
  value: number;
  valueDesignator: string;
  formatType: formatStatType;
  top?: number;
}

export interface ComparisonStat {
  icon: string;
  sort: number;
  name: string;
  first: SmallStat;
  second?: SmallStat;
}

export interface HasComparisonStat {
  comparisonStat: ComparisonStat[];
}

export enum formatStatType {
  NO_FORMAT,
  TO_FIXED_1,
  TO_PERCENT,
  TO_PRETTY,
}

export function getFormattedStat(stat: SmallStat) {
  switch (stat.formatType) {
    case formatStatType.NO_FORMAT:
      return stat.value + stat.valueDesignator;
    case formatStatType.TO_FIXED_1:
      return stat.value.toFixed(1) + stat.valueDesignator;
    case formatStatType.TO_PERCENT:
      return formatPercentage(stat.value, 0) + stat.valueDesignator;
    case formatStatType.TO_PRETTY:
      return formatNumber(stat.value) + stat.valueDesignator;
    default:
      return 'missing format';
  }
}

export function instanceOfComparisonStat(object: any): object is HasComparisonStat {
  return 'comparisonStat' in object;
}
