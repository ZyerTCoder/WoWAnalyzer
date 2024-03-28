import { formatNumber, formatPercentage } from 'common/format';

export interface SubStat {
  value: number;
  valueDesignator: string;
  formatType: formatStatType;
  top?: number;
}

type NonEmpty<SubStat> = [SubStat, ...SubStat[]];

export interface ComparisonStat {
  icon: string;
  sort: number;
  name: string;
  stats: NonEmpty<SubStat>;
}

export enum formatStatType {
  NO_FORMAT,
  TO_FIXED_1,
  TO_PERCENT,
  TO_PRETTY,
}

export function getFormattedStat(stat: SubStat) {
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

export interface HasComparisonStat {
  comparisonStat: ComparisonStat[];
}

export function instanceOfComparisonStat(object: any): object is HasComparisonStat {
  return 'comparisonStat' in object;
}
