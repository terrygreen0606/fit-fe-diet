import React from 'react';
import WithTranslate from 'components/hoc/WithTranslate';
import { getTranslate } from 'utils';

import { ReactComponent as RewardImage } from 'assets/img/reward-img.svg';

import './AdherenceDietPlan.sass';

type AdherenceDietPlanProps = {
  todayProgress: number;
  weekProgress: number;
  localePhrases: [];
  className?: string;
};

const AdherenceDietPlanPropsDefault = {
  className: '',
};

const AdherenceDietPlan = ({
  todayProgress,
  weekProgress,
  localePhrases,
  className,
}: AdherenceDietPlanProps) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  return (
    <div className={`${className} adherence-diet-card card-bg`}>
      <h4 className='adherence-diet-card-title'>
        {t('mp.adherence.title')}
      </h4>
      <div className='adherence-diet-card-img'>
        <RewardImage />
      </div>
      <div className='adherence-diet-card-content'>
        <p dangerouslySetInnerHTML={{ __html: t('mp.completed', { COUNT: todayProgress }) }} />
      </div>
      <div className='adherence-diet-card-progress'>
        <div className='adherence-diet-card-progress-desc'>
          <div className='adherence-diet-card-progress-desc-title'>
            {t('mp.week_progress')}
          </div>
          <a
            href='/'
            className='adherence-diet-card-progress-desc-link'
          >
            {t('mp.report')}
          </a>
        </div>
        <div className='adherence-diet-card-progress-line'>
          <div
            style={{
              left: `calc(${weekProgress}% - 40px)`,
            }}
            className='adherence-diet-card-progress-line-percent'
          >
            {`${weekProgress}%`}
          </div>
          <div
            style={{
              width: `${weekProgress}%`,
            }}
            className='adherence-diet-card-progress-line-painted'
          />
        </div>
      </div>
    </div>
  );
};

AdherenceDietPlan.defaultProps = AdherenceDietPlanPropsDefault;

export default WithTranslate(AdherenceDietPlan);
