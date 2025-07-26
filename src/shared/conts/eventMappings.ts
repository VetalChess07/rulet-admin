export enum EventsStatistEnum {
  GOAL = 'goal',
  PENALTY = 'penalty',
  AUTOGOAL = 'autogoal',
  MISSED_PENALTY = 'missed_penalty',
  YELLOW_CARD = 'yellow_card',
  RED_CARD = 'red_card',
  INJURY = 'injury',
  SUBSTITUTION = 'substitution',
}

export const RussianToEventMap: Record<string, EventsStatistEnum> = {
  г: EventsStatistEnum.GOAL,
  '11м': EventsStatistEnum.PENALTY,
  св: EventsStatistEnum.AUTOGOAL,
  '-11м': EventsStatistEnum.MISSED_PENALTY,
  жк: EventsStatistEnum.YELLOW_CARD,
  кк: EventsStatistEnum.RED_CARD,
  т: EventsStatistEnum.INJURY,
  з: EventsStatistEnum.SUBSTITUTION,
} as const;

export const EventToRussianFullNameMap: Record<string, string> = {
  г: 'Гол',
  '11м': 'Пенальти 11м (реализован)',
  св: 'Автогол',
  '-11м': 'Незабитый пенальти 11м',
  жк: 'Желтая карточка',
  кк: 'Красная карточка',
  т: 'травматический случай',
  з: 'Замена',
};

export type RussianEventKey = keyof typeof RussianToEventMap;
export type EventToRussianFullNameKey = keyof typeof EventToRussianFullNameMap;

export type EventsStatistType =
  | 'goal'
  | 'penalty'
  | 'autogoal'
  | 'missed_penalty'
  | 'yellow_card'
  | 'red_card'
  | 'teams_info'
  | 'injury'
  | 'substitution';

export const EventEnglishToRussianFullNameMap: Record<
  EventsStatistType,
  string
> = {
  goal: 'Гол',
  penalty: 'Пенальти 11м (реализован)',
  autogoal: 'Автогол',
  missed_penalty: 'Незабитый пенальти 11м',
  yellow_card: 'Желтая карточка',
  red_card: 'Красная карточка',
  teams_info: 'Информация о командах',
  injury: 'травматический случай',
  substitution: 'Замена',
};

export type EventBroadcastName =
  | 'match'
  | 'timer-start'
  | 'timer-stop'
  | 'event'
  | 'score'
  | 'notification'
  | 'timeout'
  | 'replacedPlayer'
  | 'updateName'
  | 'eventNotify'
  | 'set-timer'
  | 'set-timer-additionallytime'
  | 'setColorsPlayer';
