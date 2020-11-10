import React from 'react';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsSubscriptionPlan.sass';

// Icons
import { ReactComponent as PersonalProgramIcon } from 'assets/img/icons/personal-program-icon.svg';
import { ReactComponent as ShoppingListFoodIcon } from 'assets/img/icons/shopping-list-food-icon.svg';
import { ReactComponent as HealthTrackerIcon } from 'assets/img/icons/health-tracker-icon.svg';
import Button from 'components/common/Forms/Button';

const SettingsSubscriptionPlan = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <Helmet>
        <title>{t('app.title.faq')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.faq')}
        />
      </div>
      <ProfileLayout>
        <div className='subsciption-plan card-bg'>
          <h2 className='subsciption-plan__title'>
            {t('subscription.title')}
          </h2>
          <h2 className='subsciption-plan__subtitle'>
            {t('subscription.current_plan')}
          </h2>
          <div className='subsciption-plan__current card-bg'>
            <div className='subsciption-plan__current-desc'>
              <div className='subsciption-plan__current-desc-item'>
                <div className='subsciption-plan__current-desc-item-media'>
                  <PersonalProgramIcon />
                </div>
                <div className='subsciption-plan__current-desc-item-text'>
                  {t('subscription.personal_program')}
                </div>
              </div>
              <div className='subsciption-plan__current-desc-item'>
                <div className='subsciption-plan__current-desc-item-media'>
                  <ShoppingListFoodIcon />
                </div>
                <div className='subsciption-plan__current-desc-item-text'>
                  {t('subscription.shopping_list')}
                </div>
              </div>
              <div className='subsciption-plan__current-desc-item'>
                <div className='subsciption-plan__current-desc-item-media'>
                  <HealthTrackerIcon />
                </div>
                <div className='subsciption-plan__current-desc-item-text'>
                  {t('subscription.health_tracker')}
                </div>
              </div>
            </div>
            <div className='subsciption-plan__current-data'>
              <div
                dangerouslySetInnerHTML={{
                  __html: t('subscription.expires', { PERIOD: '22.22.2222' }),
                }}
                className='subsciption-plan__current-data-expires'
              />
              <div className='subsciption-plan__current-data-duration'>
                {`6 ${t('common.month')}`}
              </div>
              <div className='subsciption-plan__current-data-price'>
                <div className='subsciption-plan__current-data-price-count'>
                  6.33€
                </div>
                <div className='subsciption-plan__current-data-price-month'>
                  {` / ${t('common.months_reduction')}`}
                </div>
              </div>
            </div>
          </div>
          <div className='subsciption-plan__buttons'>
            <div className='subsciption-plan__buttons-cancelable'>
              <button
                type='button'
                className='subsciption-plan__buttons-cancelable-item'
              >
                {t('subscription.cancel')}
              </button>
              <button
                type='button'
                className='subsciption-plan__buttons-cancelable-item'
              >
                {t('subscription.pause')}
              </button>
            </div>
            <Button
              color='secondary'
              className='subsciption-plan__buttons-extend'
            >
              {t('subscription.extend_plan')}
            </Button>
          </div>
          <div className='subsciption-plan__info'>
            <h5>
              Some information how it works
            </h5>
            <p>
              sobib igaks toidukorraks
              Võid kõik retseptid enda soovi
              järgi välja vahetada. Selline
              võimalus tuleneb sellest, et
              kõik retseptid on ühesuguse
              energiaväärtuse ja sarnase t
            </p>
            <a href='/'>someemail@gaasdf.ru</a>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(SettingsSubscriptionPlan);
