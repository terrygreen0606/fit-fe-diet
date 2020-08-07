import { ReactComponent as DumbbellIcon } from "assets/img/icons/dumbbell-icon.svg";
import { ReactComponent as WeighScaleIcon } from "assets/img/icons/weigh-scale-icon.svg";

export const dataForWeekWorkout = [
  {
    number: 27,
    dayOfWeek: "mon",
    type: "radio",
    defaultChecked: false,
  },
  {
    number: 28,
    dayOfWeek: "tus",
    type: "radio",
    defaultChecked: false,
  },
  {
    number: 29,
    dayOfWeek: "wed",
    type: "radio",
    defaultChecked: true,
  },
  {
    number: 30,
    dayOfWeek: "thu",
    type: "radio",
    defaultChecked: false,
  },
  {
    number: 31,
    dayOfWeek: "fri",
    type: "radio",
    defaultChecked: false,
  },
  {
    number: 0o1,
    dayOfWeek: "sat",
    type: "radio",
    defaultChecked: false,
  },
  {
    number: 0o2,
    dayOfWeek: "sun",
    type: "radio",
    defaultChecked: false,
  },
];

export const dataForTodayActivities = [
  {
    Icon: DumbbellIcon,
    text: "Add a workout",
  },
  {
    Icon: WeighScaleIcon,
    text: "Add today's weight",
  },
];
