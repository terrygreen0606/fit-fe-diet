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

const TodayActivityItem = ({
  icon: Icon,
  active,
  disabled,
  text,
}: ItemProps) => (
    <div
      className={classnames('today-activities-activity-card card-bg', {
        active,
        disabled,
      })}
    >
      <span className='today-activities-activity-card-checkmark' />
      <span className='today-activities-activity-card-icon-wrap'>
        <Icon className='today-activities-activity-card-icon' />
      </span>
      <h6 className='today-activities-activity-card-title'>
        {text}
      </h6>
    </div>
  );

export default TodayActivityItem;
