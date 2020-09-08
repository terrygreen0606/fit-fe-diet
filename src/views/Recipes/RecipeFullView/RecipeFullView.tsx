import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes, MAIN, RECIPES } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './RecipeFullView.sass';

// Icons
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as HeartFilledIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as CartButtonIcon } from 'assets/img/icons/cart-button-icon.svg';
import { ReactComponent as ReloadBlueIcon } from 'assets/img/icons/reload-blue-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/img/icons/save-icon.svg';
import { ReactComponent as NotesIcon } from 'assets/img/icons/notes-icon.svg';
import { ReactComponent as CopyIcon } from 'assets/img/icons/copy-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as SproutIcon } from 'assets/img/icons/sprout-icon.svg';

const RecipeFullView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('app.title.recipe')}</title>
      </Helmet>
      <div className='recipe'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes[MAIN],
                name: MAIN,
              },
              {
                url: routes[RECIPES],
                name: RECIPES,
              },
            ]}
            currentPage={t('app.title.recipe')}
          />
          <div className='row'>
            <div className='col-xl-8'>
              <div className='recipe__main-info card-bg'>
                <div className='recipe__main-info-media'>
                  <img src='https://fitstg.s3.eu-central-1.amazonaws.com/recipe-preview.png' alt='' />
                </div>
                <div className='recipe__main-info-desc'>
                  <div className='recipe__main-info-desc-date'>
                    <CalendarIcon />
                    Monday, June 22 / Breakfast
                  </div>
                  <div className='recipe__main-info-desc-eating'>Breakfast</div>
                  <div className='recipe__main-info-desc-name'>Apple-raisin curd form</div>
                  <button type='button' className='recipe__main-info-desc-heart'>
                    <HeartFilledIcon />
                  </button>
                  <button type='button' className='recipe__main-info-desc-button'>
                    <div className='recipe__main-info-desc-button-wrap'>
                      <CheckedIcon className='recipe__main-info-desc-button-icon' />
                    </div>
                  </button>
                  <button type='button' className='recipe__main-info-desc-button recipe__main-info-desc-button_cart'>
                    <div className='recipe__main-info-desc-button-wrap'>
                      <CartButtonIcon className='recipe__main-info-desc-button-icon' />
                    </div>
                  </button>
                </div>
              </div>
              <div className='recipe__additional-info'>
                <div className='recipe__composition'>
                  <div className='recipe__composition-desc'>
                    <b>You can replace food. </b>
                    If there is a food in the recipe that you do not want to eat or
                    is not available at the moment, you can replace it.
                  </div>
                  <div className='recipe__composition-list'>
                    <div className='recipe__composition-list-item'>
                      <span className='recipe__composition-list-item-desc'>55g (1.4 tk) tortilla, täistera</span>
                      <button type='button' className='recipe__composition-list-item-button'>
                        <ReloadBlueIcon />
                      </button>
                    </div>
                    <div className='recipe__composition-list-item'>
                      <span className='recipe__composition-list-item-desc'>
                        55g (1.4 tk) tortilla, täistera 55g (1.4 tk) tortilla, täistera 55g (1.4 tk)
                        tortilla, täistera 55g (1.4 tk) tortilla, täistera 55g (1.4 tk) tortilla,
                        täistera
                      </span>
                      <button type='button' className='recipe__composition-list-item-button'>
                        <ReloadBlueIcon />
                      </button>
                    </div>
                    <div className='recipe__composition-list-item'>
                      <span className='recipe__composition-list-item-desc'>
                        55g (1.4 tk) tortilla,
                        täistera 55g (1.4 tk) tortilla, täistera
                      </span>
                      <button type='button' className='recipe__composition-list-item-button'>
                        <ReloadBlueIcon />
                      </button>
                    </div>
                    <div className='recipe__composition-list-item'>
                      <span className='recipe__composition-list-item-desc'>
                        55g (1.4 tk) tortilla,
                        täistera rtilla, täistera
                      </span>
                      <button type='button' className='recipe__composition-list-item-button'>
                        <ReloadBlueIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='recipe__manufacture'>
                  <div className='recipe__manufacture-title'>
                    <span className='recipe__manufacture-title-text'>
                      {t('recipe.manufacture')}
                    </span>
                  </div>
                  <div className='recipe__manufacture-video'></div>
                  <ol className='recipe__manufacture-list'>
                    <li className='recipe__manufacture-list-item'>
                      Peel and chop theonion. Clean and chop the peppers.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Heat half the amount of oil in a pan and add the peppers and
                      onions. Fry for about 5 minutes.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Add the drained and rinsed beans and cook for a few minutes.
                      Lift the mixture onto the tortilla.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Heat the remaining oil in a pan.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Beat the egg in the pan and stir constantly until the egg has
                      clotted. If desired, season with salt.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Spread the egg powder on the tortilla.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Add pieces of feta and sprinkle with chopped parsley if desired.
                    </li>
                    <li className='recipe__manufacture-list-item'>
                      Fold the tortilla wrap and serve.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='recipe__actions'>
                <button type='button' className='recipe__actions-button card-bg'>
                  <div className='recipe__actions-button-media'>
                    <SaveIcon />
                  </div>
                  <div className='recipe__actions-button-desc'>
                    {t('recipe.save')}
                  </div>
                  <div className='recipe__actions-button-checked'>
                    <CheckedIcon className='recipe__actions-button-checked-icon' />
                  </div>
                </button>
                <button type='button' className='recipe__actions-button card-bg'>
                  <div className='recipe__actions-button-media'>
                    <NotesIcon />
                  </div>
                  <div className='recipe__actions-button-desc'>
                    {t('recipe.notes')}
                  </div>
                  <div className='recipe__actions-button-checked'>
                    <CheckedIcon className='recipe__actions-button-checked-icon' />
                  </div>
                </button>
                <button type='button' className='recipe__actions-button card-bg'>
                  <div className='recipe__actions-button-media'>
                    <CopyIcon />
                  </div>
                  <div className='recipe__actions-button-desc'>
                    {t('recipe.copy')}
                  </div>
                  <div className='recipe__actions-button-checked'>
                    <CheckedIcon className='recipe__actions-button-checked-icon' />
                  </div>
                </button>
                <button type='button' className='recipe__actions-button card-bg'>
                  <div className='recipe__actions-button-media'>
                    <TrashIcon />
                  </div>
                  <div className='recipe__actions-button-desc'>
                    {t('recipe.delete')}
                  </div>
                  <div className='recipe__actions-button-checked'>
                    <CheckedIcon className='recipe__actions-button-checked-icon' />
                  </div>
                </button>
              </div>
              <div className='recipe__vegetables'>
                <SproutIcon className='recipe__vegetables-media' />
                <div className='recipe__vegetables-title'>
                  {t('recipe.free_vegetables.title')}
                </div>
                <div className='recipe__vegetables-desc'>
                  {t('recipe.free_vegetables.desc')}
                </div>
                <div className='recipe__vegetables-quantity'>
                  <span className='recipe__vegetables-quantity-text'>200g</span>
                  <span className='recipe__vegetables-quantity-text'>Broccoli</span>
                </div>
                <div className='recipe__vegetables-quantity'>
                  <span className='recipe__vegetables-quantity-text'>100g</span>
                  <span className='recipe__vegetables-quantity-text'>Carrots</span>
                </div>
                <div className='recipe__vegetables-quantity'>
                  <span className='recipe__vegetables-quantity-text'>300g</span>
                  <span className='recipe__vegetables-quantity-text'>Avocado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(RecipeFullView));
