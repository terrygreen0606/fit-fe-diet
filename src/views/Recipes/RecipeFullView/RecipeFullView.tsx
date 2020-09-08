/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import { routes } from 'constants/routes';
import {
  getTranslate,
  getWeigthUnit,
  getVideo,
} from 'utils';
import {
  getRecipeData,
  likeRecipe,
  preparedRecipe,
  deleteRecipe,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal/Modal';

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

  const { settings } = props;

  const recipeId = window.location.pathname.split('/')[2];

  const history = useHistory();

  const [isAvailabilityRecipe, setAvailabilityRecipe] = useState<boolean>(false);

  const [isSpinnerActive, setSpinnerActive] = useState<boolean>(true);

  const [isActiveDeleteModal, setActiveDeleteModal] = useState<boolean>(false);

  const costLevelLabel = {
    1: '$',
    2: '$$',
    3: '$$$',
  };

  const [recipeData, setRecipeData] = useState({
    calorie: null,
    carbohydrate: null,
    costLevel: null,
    cuisineIds: null,
    fat: null,
    imageIds: [],
    images: [],
    ingredients: [],
    isLiked: null,
    isPrepared: null,
    isPublic: null,
    name: null,
    preparation: null,
    protein: null,
    salt: null,
    servingsCnt: null,
    sugar: null,
    time: null,
    weight: null,
    id: null,
    videoUrl: null,
    isOwner: null,
  });

  useEffect(() => {
    getRecipeData(recipeId).then((response) => {
      const { data } = response.data;

      setRecipeData({
        ...recipeData,
        calorie: data.calorie,
        carbohydrate: data.carbohydrate,
        costLevel: data.cost_level,
        cuisineIds: data.cuisine_ids,
        fat: data.fat,
        imageIds: data.image_ids,
        images: data.images,
        ingredients: data.ingredients,
        isLiked: data.is_liked,
        isPrepared: data.is_prepared,
        isPublic: data.is_public,
        name: data.name_i18n,
        preparation: data.preparation_i18n,
        protein: data.protein,
        salt: data.salt,
        servingsCnt: data.servings_ctn,
        sugar: data.sugar,
        time: data.time,
        weight: data.weight,
        id: data._id,
        videoUrl: data.video_url,
        isOwner: data.is_owner,
      });

      setAvailabilityRecipe(true);
    }).catch(() => {
      setAvailabilityRecipe(false);
    }).finally(() => {
      setSpinnerActive(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.recipe')}</title>
      </Helmet>
      {isSpinnerActive && (
        <div className='container text-center mb-5'>
          <Spinner
            size='lg'
            color='#0FC1A1'
          />
        </div>
      )}
      {(!isAvailabilityRecipe && !isSpinnerActive) && (
        <div className='container mb-5'>
          <div className='recipe__error'>
            {`${t('recipe.error')}!`}
          </div>
        </div>
      )}
      {isAvailabilityRecipe && (
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
                    {/* need to add plug */}
                    {recipeData.images.length > 0 && (
                      <img src={recipeData.images[0].url} alt='' />
                    )}
                  </div>
                  <div className='recipe__main-info-desc'>
                    <div className='recipe__main-info-desc-date'>
                      <CalendarIcon />
                      Monday, June 22 / Breakfast
                    </div>
                    <div className='recipe__main-info-desc-eating'>Breakfast</div>
                    <div className='recipe__main-info-desc-name'>
                      {recipeData.name}
                    </div>
                    <div className='recipe__main-info-desc-row'>
                      <div className='recipe__main-info-desc-time'>{`${recipeData.time} ${t('common.min')}`}</div>
                      <div className='recipe__main-info-desc-cost-level'>{costLevelLabel[recipeData.costLevel]}</div>
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        likeRecipe(recipeId).then(() => {
                          setRecipeData({
                            ...recipeData,
                            isLiked: !recipeData.isLiked,
                          });
                        });
                      }}
                      className={classnames('recipe__main-info-desc-heart', {
                        active: recipeData.isLiked,
                      })}
                    >
                      <HeartFilledIcon />
                    </button>
                    <button
                      type='button'
                      className='recipe__main-info-desc-button recipe__main-info-desc-button_cart'
                    >
                      <div className='recipe__main-info-desc-button-wrap'>
                        <CartButtonIcon className='recipe__main-info-desc-button-icon' />
                      </div>
                    </button>
                    <button
                      type='button'
                      className={classnames('recipe__main-info-desc-button', {
                        active: recipeData.isPrepared,
                      })}
                      onClick={() => {
                        preparedRecipe(recipeId).then(() => {
                          setRecipeData({
                            ...recipeData,
                            isPrepared: !recipeData.isPrepared,
                          });
                        });
                      }}
                    >
                      <div className='recipe__main-info-desc-button-wrap'>
                        <CheckedIcon className='recipe__main-info-desc-button-icon' />
                      </div>
                    </button>
                  </div>
                </div>
                <div className='recipe__additional-info'>
                  <div className='recipe__composition'>
                    <div
                      dangerouslySetInnerHTML={
                        { __html: t('recipe.replace_food') }
                      }
                      className='recipe__composition-desc'
                    />
                    <div className='recipe__composition-list'>
                      {recipeData.ingredients.map((ingredient) => (
                        <div
                          key={ingredient.ingredient_id}
                          className='recipe__composition-list-item'
                        >
                          {`${ingredient.weight}
                          ${t(`common.${getWeigthUnit(settings.measurement)}`)}.
                          ${ingredient.name_i18n}`}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='recipe__manufacture'>
                    <div className='recipe__manufacture-title'>
                      <span className='recipe__manufacture-title-text'>
                        {t('recipe.manufacture')}
                      </span>
                    </div>
                    <div className='recipe__manufacture-video'>
                      {recipeData.videoUrl && (
                        <iframe
                          title='video'
                          width='100%'
                          height='400px'
                          src={getVideo(recipeData.videoUrl)}
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className='recipe__manufacture-desc'>
                      {recipeData.preparation}
                    </div>
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
                  {recipeData.isOwner && (
                    <button
                      type='button'
                      onClick={() => setActiveDeleteModal(true)}
                      className='recipe__actions-button card-bg'
                    >
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
                  )}
                  {isActiveDeleteModal && (
                    <Modal
                      withCloseBtn
                      shouldCloseOnOverlayClick
                      onClose={() => setActiveDeleteModal(false)}
                      className='recipe__delete-modal'
                    >
                      <div className='recipe__delete-modal-title'>
                        {t('recipe.delete.confirmation')}
                      </div>
                      <div className='recipe__delete-modal-btn-wrap'>
                        <Button
                          color='primary'
                          onClick={() => deleteRecipe(recipeId).then(() => history.push(routes.recipes))}
                          className='recipe__delete-modal-btn'
                        >
                          {t('common.yes')}
                        </Button>
                        <Button
                          color='cancel'
                          onClick={() => setActiveDeleteModal(false)}
                          className='recipe__delete-modal-btn'
                        >
                          {t('common.no')}
                        </Button>
                      </div>
                    </Modal>
                  )}
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
                    <span className='recipe__vegetables-quantity-text'>
                      {t('common.grams', { number: 200 })}
                    </span>
                    <span className='recipe__vegetables-quantity-text'>Broccoli</span>
                  </div>
                  <div className='recipe__vegetables-quantity'>
                    <span className='recipe__vegetables-quantity-text'>
                      {t('common.grams', { number: 100 })}
                    </span>
                    <span className='recipe__vegetables-quantity-text'>Carrots</span>
                  </div>
                  <div className='recipe__vegetables-quantity'>
                    <span className='recipe__vegetables-quantity-text'>
                      {t('common.grams', { number: 300 })}
                    </span>
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
                    <span>{t('common.calories', { number: (recipeData.calorie / 1000).toFixed(0) })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-list'>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.salt')}</span>
                      <span>
                        {`${recipeData.salt}
                        ${t(`common.${getWeigthUnit(settings.measurement)}`)}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.fats')}</span>
                      <span>
                        {`${recipeData.fat}
                        ${t(`common.${getWeigthUnit(settings.measurement)}`)}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.sugar')}</span>
                      <span>
                        {`${recipeData.sugar}
                        ${t(`common.${getWeigthUnit(settings.measurement)}`)}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.proteins')}</span>
                      <span>
                        {`${recipeData.protein}
                        ${t(`common.${getWeigthUnit(settings.measurement)}`)}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.carbohydrates')}</span>
                      <span>
                        {`${recipeData.carbohydrate}
                        ${t(`common.${getWeigthUnit(settings.measurement)}`)}`}
                      </span>
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
      )
      }
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}))(RecipeFullView));
