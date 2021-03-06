import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { routes } from 'constants/routes';
import { getTranslate, convertTime } from 'utils';
import { getCheckoutTariff, userTariffPause } from 'api';
import { userLogout } from 'store/actions';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import Breadcrumb from 'components/Breadcrumb';
import useOutsideClick from 'components/hooks/useOutsideClick';

import './SettingsSubscriptionPlan.sass';

// Icons
import { ReactComponent as PersonalProgramIcon } from 'assets/img/icons/personal-program-icon.svg';
import { ReactComponent as ShoppingListFoodIcon } from 'assets/img/icons/shopping-list-food-icon.svg';
import { ReactComponent as HealthTrackerIcon } from 'assets/img/icons/health-tracker-icon.svg';

const SettingsSubscriptionPlan = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [paidUntilDate, setPaidUntilDate] = useState<string>(null);
  const [tariffData, setTariffData] = useState<{
    months: number,
    priceMonthly: string,
  }>({
    months: null,
    priceMonthly: null,
  });
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const priceTextWrap = useRef(null);
  const priceText = useRef(null);

  useEffect(() => {
    let cleanComponent = false;

    if (!cleanComponent) {
      getCheckoutTariff().then(({ data }) => {
        if (data.data && data.success) {
          setTariffData({
            ...tariffData,
            months: data.data.months,
            priceMonthly: data.data.price_monthly_text,
          });
        }
      }).catch(() => toast.error(t('common.error')))
        .finally(() => setIsLoadingPage(false));
    }

    return () => cleanComponent = true;
  }, []);

  useEffect(() => {
    let cleanComponent = false;

    if (!cleanComponent) {
      if (priceText.current?.innerText) {
        for (let i = 1; priceText.current.clientWidth < priceTextWrap.current.clientWidth; i++) {
          priceText.current.style.fontSize = `${16 + i}px`;
          if (priceText.current.clientWidth >= priceTextWrap.current.clientWidth) {
            priceText.current.style.fontSize = `${16 + i - 1}px`;
            break;
          }
        }
      }
    }

    return () => cleanComponent = true;
  }, [tariffData.priceMonthly, isLoadingPage]);

  useEffect(() => {
    let cleanComponent = false;

    if (!cleanComponent) {
      setPaidUntilDate(convertTime(settings.paid_until, settings.language));
    }

    return () => cleanComponent = true;
  }, [settings.paid_until]);

  const userTariffPauseClick = () => {
    userTariffPause()
      .then(({ data }) => {
        if (data.success) {
          props.userLogout();
        }
      })
      .catch(() => toast.error(t('common.error')));
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.subscription')}</title>
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
          <ContentLoading
            isLoading={isLoadingPage}
            isError={false}
            spinSize='sm'
          >
            <h2 className='subsciption-plan__title'>
              {t('subscription.title')}
            </h2>
            {settings.paid_until ? (
              <>
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
                        __html: t('subscription.expires', { PERIOD: paidUntilDate }),
                      }}
                      className='subsciption-plan__current-data-expires'
                    />
                    <div className='subsciption-plan__current-data-duration'>
                      {t('subscription.months', { COUNT: tariffData.months })}
                    </div>
                    <div className='subsciption-plan__current-data-price'>
                      <div
                        ref={priceTextWrap}
                        className='subsciption-plan__current-data-price-count-wrap'
                      >
                        <div
                          ref={priceText}
                          className='subsciption-plan__current-data-price-count'
                        >
                          {tariffData.priceMonthly}
                        </div>
                      </div>
                      <div className='subsciption-plan__current-data-price-month'>
                        {` / ${t('common.months_reduction')}`}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
                <h2 className='mb-5'>
                  {t('subscription.not_paid')}
                </h2>
              )}
            <div className='subsciption-plan__buttons'>
              {settings.paid_until ? (
                <div className='subsciption-plan__buttons-cancelable'>
                  {/* <button
                    type='button'
                    className='subsciption-plan__buttons-cancelable-item'
                  >
                    {t('subscription.cancel')}
                  </button> */}
                  <div ref={changedBlockRef}>
                    <button
                      type='button'
                      onClick={() => setIsBlockActive(!isBlockActive)}
                      className='subsciption-plan__buttons-cancelable-item'
                    >
                      {t('subscription.pause')}
                    </button>
                    <div className={classnames('subsciption-plan__buttons-pause-modal card-bg', {
                      active: isBlockActive,
                    })}
                    >
                      <h3 className='subsciption-plan__buttons-pause-modal-title'>
                        {t('subscription.pause_plan.title')}
                      </h3>
                      <Button
                        color='cancel'
                        onClick={() => userTariffPauseClick()}
                        className='subsciption-plan__buttons-pause-modal-btn'
                      >
                        {t('subscription.pause_plan.button')}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
              <Link to={routes.checkout}>
                <Button
                  color='secondary'
                  className='subsciption-plan__buttons-extend'
                >
                  {t('subscription.extend_plan')}
                </Button>
              </Link>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: t('subscription.desc'),
              }}
              className='subsciption-plan__info'
            />
          </ContentLoading>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}), { userLogout })(SettingsSubscriptionPlan));
