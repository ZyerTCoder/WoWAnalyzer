import { AnyEvent } from 'parser/core/Events';
import aplCheck, { Apl, CheckResult, PlayerInfo, build } from 'parser/shared/metrics/apl';
import { rotation } from './rules';

export const apl = (info: PlayerInfo): Apl => {
  return build(rotation(info));
};

export const check = (events: AnyEvent[], info: PlayerInfo): CheckResult => {
  const check = aplCheck(apl(info));
  return check(events, info);
};
