import SPELLS from 'common/SPELLS';
import EventOrderNormalizer, { EventOrder } from 'parser/core/EventOrderNormalizer';
import { EventType } from 'parser/core/Events';
import { Options } from 'parser/core/Module';

const EVENT_ORDERS: EventOrder[] = [
  {
    beforeEventId: SPELLS.PYROBLAST.id,
    beforeEventType: [EventType.Cast, EventType.BeginCast],
    afterEventId: [SPELLS.SUN_KINGS_BLESSING_BUFF.id, SPELLS.SUN_KINGS_BLESSING_BUFF_STACK.id],
    afterEventType: EventType.RemoveBuff,
    bufferMs: 50,
    anyTarget: true,
  },
];

class SunKingsBlessing extends EventOrderNormalizer {
  constructor(options: Options) {
    super(options, EVENT_ORDERS);
  }
}

export default SunKingsBlessing;