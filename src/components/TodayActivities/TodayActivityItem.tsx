import React, { FunctionComponent, SVGProps } from 'react';
import classnames from 'classnames';

export type ItemProps = {
  value: string,
  icon: FunctionComponent<SVGProps<SVGSVGElement>>,
  text: string,
  checked?: boolean,
  disabled?: boolean,
  active?: boolean,
};

const TodayActivityItem = (props: ItemProps) => {
  const Icon = props.icon;

  return (
    <div
      className={classnames("today-activities-activity-card", {
        active: props.active,
        disabled: props.disabled,
      })}
    >
      <span className="today-activities-activity-card-checkmark"/>
      <span className="today-activities-activity-card-icon-wrap">
        <Icon className="today-activities-activity-card-icon" />
      </span>
      <h6 className="today-activities-activity-card-title">
        {props.text}
      </h6>
    </div>
  );
};

export default TodayActivityItem;
