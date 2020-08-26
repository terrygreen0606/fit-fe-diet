import React, { useState } from 'react';
import classnames from 'classnames';

import { getTranslate } from 'utils';
import WithTranslate from 'components/hoc/WithTranslate';

import Step, { StepProps } from './Step';

import './SiteTour.sass';

type SiteTourProps = {
  data: StepProps[],
  onAction: (any) => void,
  localePhrases: [],
};

const SiteTour = ({ data, onAction, localePhrases }: SiteTourProps) => {
  const [step, setStep] = useState(1);

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const onStepClick = (item) => (
    item.slide !== data.length
      ? () => setStep(item.slide + 1)
      : onAction
  );

  return (
    <section className={classnames('container quick_tour_sect', {
      slide_4: step === 4,
    })}
    >
      <div className='row quick_tour_row'>
        <span
          role='presentation'
          className='quick_tour_skip'
          onClick={onAction}
        >
          {t('common.skip')}
        </span>
        {
          data.map((item) => (
            <Step
              key={`${item.slide}_${item.title}`}
              visible={item.slide === step}
              slide={item.slide}
              title={t(item.title)}
              text={t(item.text)}
              image={item.image}
              btn_text={t(item.btn_text)}
              onClick={onStepClick(item)}
            />
          ))
        }
      </div>
    </section>
  );
};

export default WithTranslate(SiteTour);
