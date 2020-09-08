import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';

import './RecipeFullView.sass';

// Icons
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as HeartFilledIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as CartButtonIcon } from 'assets/img/icons/cart-button-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/img/icons/save-icon.svg';
import { ReactComponent as NotesIcon } from 'assets/img/icons/notes-icon.svg';
import { ReactComponent as CopyIcon } from 'assets/img/icons/copy-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as SproutIcon } from 'assets/img/icons/sprout-icon.svg';
import { ReactComponent as DishIcon } from 'assets/img/icons/dish-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';
import { ReactComponent as CursorTouchLogo } from 'assets/img/icons/cursor-touch-icon.svg';

const RecipeFullView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

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
                url: routes.main,
                name: t('breadcrumb.main'),
              },
              {
                url: routes.recipes,
                name: t('app.title.recipes'),
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
                  <div className='recipe__main-info-desc-row'>
                    <div className='recipe__main-info-desc-time'>40 min</div>
                    <div className='recipe__main-info-desc-cost-level'>$$$</div>
                  </div>
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
                      55g (1.4 tk) tortilla, täistera
                    </div>
                    <div className='recipe__composition-list-item'>
                      55g (1.4 tk) tortilla, täistera 55g (1.4 tk) tortilla, täistera 55g (1.4 tk)
                      tortilla, täistera 55g (1.4 tk) tortilla, täistera 55g (1.4 tk) tortilla,
                      täistera
                    </div>
                    <div className='recipe__composition-list-item'>
                      55g (1.4 tk) tortilla,
                      täistera 55g (1.4 tk) tortilla, täistera
                    </div>
                    <div className='recipe__composition-list-item'>
                      55g (1.4 tk) tortilla,
                      täistera rtilla, täistera
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
              <div className='recipe__nutrients'>
                <div className='recipe__nutrients-media'>
                  <DishIcon />
                </div>
                <div className='recipe__nutrients-title'>
                  {t('recipe.nutrient_data')}
                </div>
                <div className='recipe__nutrients-calories'>
                  <span>{t('recipe.calories')}</span>
                  <span>{t('common.calories', { number: 300 })}</span>
                </div>
                <div className='recipe__nutrients-composition-list'>
                  <div className='recipe__nutrients-composition-item'>
                    <span>{t('common.salt')}</span>
                    <span>{t('common.grams', { number: 0.5 })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-item'>
                    <span>{t('common.fats')}</span>
                    <span>{t('common.grams', { number: 10 })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-item'>
                    <span>{t('common.sugar')}</span>
                    <span>{t('common.grams', { number: 10 })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-item'>
                    <span>{t('common.proteins')}</span>
                    <span>{t('common.grams', { number: 10 })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-item'>
                    <span>{t('common.carbohydrates')}</span>
                    <span>{t('common.grams', { number: 20 })}</span>
                  </div>
                </div>
              </div>
              <div className='recipe__share card-bg'>
                <div className='recipe__share-title'>
                  {t('recipe.share.title')}
                </div>
                <div className='recipe__share-list'>
                  <a href='/' className='recipe__share-button'>
                    <TwitterLogo />
                  </a>
                  <a href='/' className='recipe__share-button'>
                    <WhatsappLogo />
                  </a>
                  <a href='/' className='recipe__share-button'>
                    <FacebookLogo />
                  </a>
                  <a href='/' className='recipe__share-button'>
                    <TelegramLogo />
                  </a>
                </div>
              </div>
              <div className='recipe__advertising card-bg'>
                <div className='recipe__advertising-title'>
                  {t('recipe.matching_wines')}
                </div>
                <div className='recipe__advertising-wrap'>
                  <div className='recipe__advertising-media'>
                    <img src='https://fitstg.s3.eu-central-1.amazonaws.com/wine.png' alt='' />
                  </div>
                  <div className='recipe__advertising-text'>
                    <div className='recipe__advertising-text-title'>Wine Chardone 1983</div>
                    <div className='recipe__advertising-text-desc'>1.0l, France</div>
                    <Button
                      color='primary'
                      className='recipe__advertising-text-btn'
                    >
                      {t('recipe.buy_here')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className='recipe__similar-recipes card-bg'>
                <div className='recipe__similar-recipes-title'>
                  {t('recipe.similar_recipes')}
                </div>
                <div className='recipe__similar-recipes-list'>
                  <div className='recipe__similar-recipes-item'>
                    <a href='/' className='recipe__similar-recipes-item-media'>
                      <img src='https://fitstg.s3.eu-central-1.amazonaws.com/recipe-preview.png' alt='' />
                      <CursorTouchLogo className='recipe__similar-recipes-item-media-icon' />
                    </a>
                    <div className='recipe__similar-recipes-item-text'>
                      <div className='recipe__similar-recipes-item-text-title'>Breakfast</div>
                      <div className='recipe__similar-recipes-item-text-desc'>Õuna-rosina kohupiimavorm</div>
                      <div className='recipe__similar-recipes-item-text-info'>
                        <div className='recipe__similar-recipes-item-text-info-time'>40 min</div>
                        <div className='recipe__similar-recipes-item-text-info-cost-level'>
                          $$
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='recipe__similar-recipes-item'>
                    <a href='/' className='recipe__similar-recipes-item-media'>
                      <img src='https://fitstg.s3.eu-central-1.amazonaws.com/recipe-preview.png' alt='' />
                      <CursorTouchLogo className='recipe__similar-recipes-item-media-icon' />
                    </a>
                    <div className='recipe__similar-recipes-item-text'>
                      <div className='recipe__similar-recipes-item-text-title'>Breakfast</div>
                      <div className='recipe__similar-recipes-item-text-desc'>Õuna-rosina kohupiimavorm</div>
                      <div className='recipe__similar-recipes-item-text-info'>
                        <div className='recipe__similar-recipes-item-text-info-time'>40 min</div>
                        <div className='recipe__similar-recipes-item-text-info-cost-level'>
                          $$
                        </div>
                      </div>
                    </div>
                  </div>
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
