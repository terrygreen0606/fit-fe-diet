/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { getTranslate, scrollToElement } from 'utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useWindowSize from 'components/hooks/useWindowSize';

import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './HeaderPromo.sass';

type HeaderPromoProps = {
  localePhrases: any,
  activeTariffIdToPay: any,
};

const HeaderPromo = ({
  localePhrases,
  activeTariffIdToPay,
}: HeaderPromoProps) => {
  const { width: windowWidth } = useWindowSize();

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const scrollToCheckoutForm = (e) => {
    const afterSignupTariffs = document.getElementById('selectTariffPlanBlock');

    if (afterSignupTariffs) {
      e.preventDefault();
      scrollToElement(document.getElementById('selectTariffPlanBlock'), -30);
    }
  };

  return (
    <header id='mainPromoHeader' className='main-promo-header'>
      <div className='container'>
        <div className='row'>
          <div className='col-5 col-xs-4'>

            <button
              type='button'
              className='mainHeader_logo btn-clear'
              onClick={scrollToCheckoutForm}
            />

          </div>
          <div className='col-7 col-xs-8 text-right'>

            <Link
              to={routes.checkout}
              onClick={(e) => {
                if (!activeTariffIdToPay) {
                  e.preventDefault();
                  scrollToCheckoutForm(e);
                }
              }}
              className='link-raw'
            >
              <Button
                className='main-promo-header__btn'
                size='sm'
                color='primary-shadow'
              >
                {windowWidth > 480 ? t('button.reveal_plan') : t('button.reveal_plan.short')}
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      activeTariffIdToPay: state.storage.activeTariffIdToPay,
    }),
  )(HeaderPromo),
);
