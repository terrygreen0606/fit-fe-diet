import { ReactComponent as DumbbellIcon } from "assets/img/icons/dumbbell-icon.svg";
import { ReactComponent as WeighScaleIcon } from "assets/img/icons/weigh-scale-icon.svg";

export const tabs = ["Elementary level", "Intermediate", "Advanced"];

export const dataForWeekWorkout = [
  {
    number: "27",
    value: "mon",
  },
  {
    number: "28",
    value: "tus",
  },
  {
    number: "29",
    value: "wed",
  },
  {
    number: "30",
    value: "thu",
  },
  {
    number: "31",
    value: "fri",
  },
  {
    number: "01",
    value: "sat",
  },
  {
    number: "02",
    value: "sun",
  },
];

export const dataForTodayActivities = [
  {
    icon: DumbbellIcon,
    text: "Add a workout",
    value: "workout_add",
  },
  {
    icon: WeighScaleIcon,
    text: "Add today's weight",
    value: "weight_add",
  },
];
