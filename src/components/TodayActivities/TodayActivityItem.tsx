import React, { FunctionComponent, SVGProps } from 'react';
import classnames from 'classnames';

export type ItemProps = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>,
  text: string,
  todayActivities?: Array<string>,
};

const TodayActivityItem = (props: ItemProps) => {
  return (
    <div
      className={classnames("today-activities-activity-card", {
        active: props.todayActivities.includes(props.text),
      })}
    >
      <span className="today-activities-activity-card-checkmark"/>
      <span className="today-activities-activity-card-icon-wrap">
        <props.icon className="today-activities-activity-card-icon" />
      </span>
      <h6 className="today-activities-activity-card-title">
        {props.text}
      </h6>
    </div>
  );
};

export default TodayActivityItem;
