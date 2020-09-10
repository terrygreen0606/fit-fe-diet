/* eslint-disable no-return-assign */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getWeigthUnit,
  getVideo,
} from 'utils';
import {
  getRecipeData,
  likeRecipe,
  preparedRecipe,
  deleteRecipe,
  addRecipeNote,
  addToShoppingListByRecipes,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal/Modal';

import './RecipeFullView.sass';

// Icons
import { ReactComponent as HeartFilledIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as CartButtonIcon } from 'assets/img/icons/cart-button-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/img/icons/save-icon.svg';
import { ReactComponent as NotesIcon } from 'assets/img/icons/notes-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as DishIcon } from 'assets/img/icons/dish-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';
import { ReactComponent as CursorTouchLogo } from 'assets/img/icons/cursor-touch-icon.svg';
import InputField from 'components/common/Forms/InputField';

const RecipeFullView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [recipeId, setRecipeId] = useState(window.location.pathname.split('/')[2]);

  const costLevelLabel = {
    1: '$',
    2: '$$',
    3: '$$$',
  };

  const history = useHistory();

  const [isAvailabilityRecipe, setAvailabilityRecipe] = useState<boolean>(false);

  const [isSpinnerActive, setSpinnerActive] = useState<boolean>(true);

  const [isActiveDeleteModal, setActiveDeleteModal] = useState<boolean>(false);

  const [isActiveNotesModal, setActiveNotesModal] = useState<boolean>(false);

  const [addNoteForm, setAddNoteForm] = useState({
    note: '',
  });

  const [addNoteFormErrors, setAddNoteFormErrors] = useState([]);

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, addNoteFormErrors);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      addNoteForm,
      setAddNoteForm,
      addNoteFormErrors,
      setAddNoteFormErrors,
      element,
    );
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
    mealtimeCodes: [],
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
    similar: [],
  });

  useEffect(() => {
    let cleanComponent = false;

    getRecipeData(recipeId).then((response) => {
      const { data } = response.data;

      if (!cleanComponent) {
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
          mealtimeCodes: data.mealtime_codes,
          name: data.name_i18n,
          preparation: data.preparation_i18n,
          protein: data.protein,
          salt: data.salt,
          servingsCnt: data.servings_cnt,
          sugar: data.sugar,
          time: data.time,
          weight: data.weight,
          id: data._id,
          videoUrl: data.video_url,
          isOwner: data.is_owner,
          similar: data.similar,
        });

        setAvailabilityRecipe(true);
      }
    }).catch(() => {
      if (!cleanComponent) setAvailabilityRecipe(false);
    }).finally(() => {
      if (!cleanComponent) setSpinnerActive(false);
    });

    return () => cleanComponent = true;
  }, [recipeId]);

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
              currentPage={recipeData.name}
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
                    <div className='recipe__main-info-desc-name'>
                      {recipeData.name}
                    </div>
                    <div className='recipe__main-info-desc-eating'>
                      {recipeData.mealtimeCodes.map((item) => (
                        <div key={item.code}>
                          {item.code}
                        </div>
                      ))}
                    </div>
                    <div className='recipe__main-info-desc-row'>
                      <div className='recipe__main-info-desc-time'>
                        {recipeData.time && (
                          `${recipeData.time} ${t('common.min')}`
                        )}
                      </div>
                      <div className='recipe__main-info-desc-cost-level'>{costLevelLabel[recipeData.costLevel]}</div>
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        setRecipeData({
                          ...recipeData,
                          isLiked: !recipeData.isLiked,
                        });
                        likeRecipe(recipeId).then((response) => {
                          setRecipeData({
                            ...recipeData,
                            isLiked: response.data.data.is_liked,
                          });
                        }).catch(() => {
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
                      onClick={() => {
                        addToShoppingListByRecipes([recipeData.id], recipeData.servingsCnt).then(() =>
                          toast.success(t('recipe.update_shopping_list.success'), {
                            autoClose: 3000,
                          }));
                      }}
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
                        setRecipeData({
                          ...recipeData,
                          isPrepared: !recipeData.isPrepared,
                        });
                        preparedRecipe(recipeId).then((response) => {
                          setRecipeData({
                            ...recipeData,
                            isPrepared: response.data.data.is_prepared,
                          });
                        }).catch(() => {
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
                          ${t(getWeigthUnit(settings.measurement))}.
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
                  <button
                    type='button'
                    onClick={() => setActiveNotesModal(true)}
                    className='recipe__actions-button card-bg'
                  >
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
                  {isActiveNotesModal && (
                    <Modal
                      withCloseBtn
                      shouldCloseOnOverlayClick
                      onClose={() => setActiveNotesModal(false)}
                      className='recipe__modal'
                    >
                      <div className='recipe__modal-title'>
                        {t('recipe.add_note.desc')}
                      </div>
                      <div className='recipe__modal-textarea-wrap'>
                        <InputField
                          block
                          type='textarea'
                          name='note'
                          data-validate='["required"]'
                          errors={getFieldErrors('note')}
                          value={addNoteForm.note}
                          onChange={(e) => validateOnChange('note', e.target.value, e)}
                          className='recipe__modal-textarea'
                        />
                        <Button
                          color='primary'
                          disabled={!addNoteForm.note}
                          onClick={() => {
                            addRecipeNote(recipeId, addNoteForm.note).then((response) => {
                              if (response.data.success) {
                                toast.success(t('recipe.add_note.success'), {
                                  autoClose: 3000,
                                });

                                setAddNoteForm({ ...addNoteForm, note: '' });

                                setActiveNotesModal(false);
                              } else {
                                toast.error(t('recipe.add_note.availability_error'), {
                                  autoClose: 3000,
                                });
                              }
                            }).catch(() => {
                              toast.error(t('recipe.add_note.error'), {
                                autoClose: 3000,
                              });
                            });
                          }}
                        >
                          {t('recipe.add_note.confirm')}
                        </Button>
                      </div>
                    </Modal>
                  )}
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
                      className='recipe__modal'
                    >
                      <div className='recipe__modal-title'>
                        {t('recipe.delete.confirm')}
                      </div>
                      <div className='recipe__modal-btn-wrap'>
                        <Button
                          color='primary'
                          onClick={() => deleteRecipe(recipeId).then(() => history.push(routes.recipes))}
                          className='recipe__modal-btn'
                        >
                          {t('common.yes')}
                        </Button>
                        <Button
                          color='cancel'
                          onClick={() => setActiveDeleteModal(false)}
                          className='recipe__modal-btn'
                        >
                          {t('common.no')}
                        </Button>
                      </div>
                    </Modal>
                  )}
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
                        {`${recipeData.salt} ${t(getWeigthUnit(settings.measurement))}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.fats')}</span>
                      <span>
                        {`${recipeData.fat} ${t(getWeigthUnit(settings.measurement))}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.sugar')}</span>
                      <span>
                        {`${recipeData.sugar} ${t(getWeigthUnit(settings.measurement))}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.proteins')}</span>
                      <span>
                        {`${recipeData.protein} ${t(getWeigthUnit(settings.measurement))}`}
                      </span>
                    </div>
                    <div className='recipe__nutrients-composition-item'>
                      <span>{t('common.carbohydrates')}</span>
                      <span>
                        {`${recipeData.carbohydrate} ${t(getWeigthUnit(settings.measurement))}`}
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
                    {recipeData.similar.map((similarRecipe) => (
                      <div key={similarRecipe.id} className='recipe__similar-recipes-item'>
                        <button
                          type='button'
                          onClick={() => {
                            setRecipeId(similarRecipe.id);
                            const recipeInfoBlock = document.querySelector('.recipe__main-info');
                            recipeInfoBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className='recipe__similar-recipes-item-media'
                        >
                          <img src={similarRecipe.image_url} alt='' />
                          <CursorTouchLogo className='recipe__similar-recipes-item-media-icon' />
                        </button>
                        <div className='recipe__similar-recipes-item-text'>
                          <button
                            type='button'
                            onClick={() => {
                              setRecipeId(similarRecipe.id);
                              const recipeInfoBlock = document.querySelector('.recipe__main-info');
                              recipeInfoBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className='recipe__similar-recipes-item-text-name'
                          >
                            {similarRecipe.name_i18n}
                          </button>
                          <div className='recipe__similar-recipes-item-text-meal-time'>
                            {similarRecipe.mealtime_codes.map((mealTimeItem) => (
                              <span
                                key={mealTimeItem.code}
                                className='recipe__similar-recipes-item-text-meal-time-block'
                              >
                                {mealTimeItem.code}
                              </span>
                            ))}
                          </div>
                          <div className='recipe__similar-recipes-item-text-info'>
                            {similarRecipe.time && (
                              <div className='recipe__similar-recipes-item-text-info-time'>
                                {`${similarRecipe.time} ${t('common.min')}`}
                              </div>
                            )}
                            <div className='recipe__similar-recipes-item-text-info-cost-level'>
                              {similarRecipe.cost_level && (
                                costLevelLabel[similarRecipe.cost_level]
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}))(RecipeFullView));
