import React, { FunctionComponent, SVGProps } from 'react';
import WithTranslate from 'components/hoc/WithTranslate';
import { getTranslate } from 'utils';

import './Advantages.sass';

type AdvantagesProps = {
  icon1: FunctionComponent<SVGProps<SVGSVGElement>>,
  icon2: FunctionComponent<SVGProps<SVGSVGElement>>,
  icon3: FunctionComponent<SVGProps<SVGSVGElement>>,
  mainTitle: string,
  advantage1Title: string,
  advantage1Desc: string,
  advantage2Title: string,
  advantage2Desc: string,
  advantage3Title: string,
  advantage3Desc: string,
  localePhrases: [];
  isShowBtn?: boolean,
  onClickShowBtn?: () => void,
};

const AdvantagesPropsDefault = {
  isShowBtn: false,
  onClickShowBtn: () => { },
};

const Advantages = ({
  icon1: Icon1,
  icon2: Icon2,
  icon3: Icon3,
  mainTitle,
  advantage1Desc,
  advantage1Title,
  advantage2Desc,
  advantage2Title,
  advantage3Desc,
  advantage3Title,
  localePhrases,
  isShowBtn,
  onClickShowBtn,
}: AdvantagesProps) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  return (
    <section className='how-exercise-plan-works-sect'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 px-md-4 justify-content-between'>
            <div className='how-exercise-plan-works-col d-flex align-items-center'>

              <h4 className='how-exercise-plan-works-title'>{mainTitle}</h4>

            </div>
            <div className='how-exercise-plan-works-col'>

              <div className='how-exercise-plan-works-icon-wrap'>
                <Icon1 className='how-exercise-plan-works-icon' />
              </div>

              <div className='how-exercise-plan-works-text'>
                <h4 className='mb-4'>{advantage1Title}</h4>
                <p>{advantage1Desc}</p>
              </div>

            </div>
            <div className='how-exercise-plan-works-col'>

              <div className='how-exercise-plan-works-icon-wrap'>
                <Icon2 className='how-exercise-plan-works-icon' />
              </div>

              <div className='how-exercise-plan-works-text'>
                <h4 className='mb-4'>{advantage2Title}</h4>
                <p>{advantage2Desc}</p>
              </div>

            </div>
            <div className='how-exercise-plan-works-col'>

              <div className='how-exercise-plan-works-icon-wrap'>
                <Icon3 className='how-exercise-plan-works-icon' />
              </div>

              <div className='how-exercise-plan-works-text'>
                <h4 className='mb-4'>{advantage3Title}</h4>
                <p>{advantage3Desc}</p>
              </div>

            </div>
          </div>
        </div>
        {isShowBtn && (
          <button
            type='button'
            onClick={onClickShowBtn}
            className='how-exercise-plan-works-sect-hiding-btn'
          >
            {t('mp.hidden')}
          </button>
        )}
      </div>
    </section>
  );
};

Advantages.defaultProps = AdvantagesPropsDefault;

export default WithTranslate(Advantages);
