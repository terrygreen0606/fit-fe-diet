/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import { costLevelLabel } from 'constants/costLevelLabel';
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
  prepareRecipe,
  deleteRecipe,
  addRecipeNote,
  addToShoppingListByRecipes,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal';
import InputField from 'components/common/Forms/InputField';
import ShareButtons from 'components/ShareButtons';
import useOutsideClick from 'components/hooks/useOutsideClick';

import './RecipeFullView.sass';

// Icons
import { ReactComponent as HeartFilledIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as CartButtonIcon } from 'assets/img/icons/cart-button-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as NotesIcon } from 'assets/img/icons/notes-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as DishIcon } from 'assets/img/icons/dish-icon.svg';
import { ReactComponent as CursorTouchLogo } from 'assets/img/icons/cursor-touch-icon.svg';
import { ReactComponent as CloseIconLogo } from 'assets/img/icons/close-icon.svg';
import { ReactComponent as ArrowLeftLogo } from 'assets/img/icons/angle-left-icon.svg';
import { ReactComponent as ArrowRightLogo } from 'assets/img/icons/angle-right-icon.svg';
import { ReactComponent as ReloadGrayIcon } from 'assets/img/icons/reload-gray-icon.svg';

const RecipeFullView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const history = useHistory();

  const [recipeId, setRecipeId] = useState<string>('');

  const [isAvailabilityRecipe, setIsAvailabilityRecipe] = useState<boolean>(false);

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [isActiveDeleteModal, setIsActiveDeleteModal] = useState<boolean>(false);

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
    wines: [],
  });

  const getRecipeDataFunc = (data) => ({
    calorie: data.calorie,
    carbohydrate: data.carbohydrate,
    costLevel: data.cost_level,
    cuisineIds: data.cuisine_ids,
    fat: data.fat,
    imageIds: data.image_ids,
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
    wines: data.wines,
  });

  const getRecipe = (recipeIdArg: string) => {
    getRecipeData(recipeIdArg, true, true, true).then((response) => {
      if (response.data.success && response.data.data) {
        const { data } = response.data;
        const {
          images,
          note,
        } = data;

        const updatedImages = [...images];

        updatedImages[0].isActive = true;

        const preparedRecipeData = getRecipeDataFunc(data);

        setRecipeData({
          ...preparedRecipeData,
          images: updatedImages,
        });

        setAddNoteForm({ ...addNoteForm, note });
        setIsAvailabilityRecipe(true);
      }
    }).catch(() => {
      setIsAvailabilityRecipe(false);
    }).finally(() => {
      setIsSpinnerActive(false);
    });
  };

  useEffect(() => {
    const pathname = history.location.pathname.split('/');
    const recipeIdByLink = pathname[pathname.length - 1];

    setRecipeId(recipeIdByLink);

    let cleanComponent = false;
    if (!cleanComponent) getRecipe(recipeIdByLink);
    return () => cleanComponent = true;
  }, [history.location.pathname]);

  const scrollToTop = () => {
    const recipeInfoBlock = document.querySelector('.recipe__main-info');
    recipeInfoBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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
              routes={
                props.location.fromMealPlan ? ([
                  {
                    url: routes.main,
                    name: t('breadcrumb.main'),
                  },
                  {
                    url: routes.mealPlan,
                    name: t('mp.title'),
                  },
                  {
                    url: routes.recipes,
                    name: t('app.title.recipes'),
                  },
                ]) : ([
                  {
                    url: routes.main,
                    name: t('breadcrumb.main'),
                  },
                  {
                    url: routes.recipes,
                    name: t('app.title.recipes'),
                  },
                ])
              }
              currentPage={recipeData.name}
            />
            <div className='row'>
              <div className='col-xl-8'>
                <div className='recipe__main-info card-bg'>
                  <div className='recipe__main-info-media'>
                    {recipeData.images.length > 0 && (
                      <>
                        {recipeData.images.map((image) => (
                          <div
                            key={image.id}
                            className={classnames('recipe__main-info-media-slide', {
                              active: image.isActive,
                            })}
                          >
                            <a href={image.url} target='_blank' rel='noreferrer'>
                              <img src={image.url} alt='' />
                            </a>
                          </div>
                        ))}
                        {recipeData.images.length > 1 && (
                          <>
                            <button
                              type='button'
                              onClick={() => {
                                const updatedImages = [...recipeData.images];

                                updatedImages.find((findImage, findImageIndex) => {
                                  if (findImage.isActive === true) {
                                    updatedImages[findImageIndex].isActive = false;
                                    if (findImageIndex === 0) {
                                      updatedImages[updatedImages.length - 1].isActive = true;
                                    } else {
                                      updatedImages[findImageIndex - 1].isActive = true;
                                    }
                                    return updatedImages;
                                  }
                                });

                                setRecipeData({ ...recipeData, images: updatedImages });
                              }}
                              className='recipe__main-info-media-button recipe__main-info-media-prev'
                            >
                              <ArrowLeftLogo />
                            </button>
                            <button
                              type='button'
                              onClick={() => {
                                const updatedImages = [...recipeData.images];

                                updatedImages.find((findImage, findImageIndex) => {
                                  if (findImage.isActive === true) {
                                    updatedImages[findImageIndex].isActive = false;
                                    if (findImageIndex === updatedImages.length - 1) {
                                      updatedImages[0].isActive = true;
                                    } else {
                                      updatedImages[findImageIndex + 1].isActive = true;
                                    }
                                    return updatedImages;
                                  }
                                });

                                setRecipeData({ ...recipeData, images: updatedImages });
                              }}
                              className='recipe__main-info-media-button recipe__main-info-media-next'
                            >
                              <ArrowRightLogo />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className='recipe__main-info-desc'>
                    <h2 className='recipe__main-info-desc-name'>
                      {recipeData.name}
                    </h2>
                    <div className='recipe__main-info-desc-eating'>
                      {recipeData.mealtimeCodes.map((mealTimeItem) => (
                        <div
                          key={mealTimeItem.code}
                          className='recipe__main-info-desc-eating-item'
                        >
                          {t(mealTimeItem.i18n_code)}
                        </div>
                      ))}
                    </div>
                    <div className='recipe__main-info-desc-row'>
                      {recipeData.time && (
                        <div className='recipe__main-info-desc-time'>
                          {t('common.min', { COUNT: recipeData.time })}
                        </div>
                      )}
                      {recipeData.costLevel && (
                        <div className='recipe__main-info-desc-cost-level'>{costLevelLabel[recipeData.costLevel]}</div>
                      )}
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        setRecipeData({
                          ...recipeData,
                          isLiked: !recipeData.isLiked,
                        });
                        likeRecipe(recipeId).then((response) => {
                          if (response.data.success && response.data.data) {
                            setRecipeData({
                              ...recipeData,
                              isLiked: response.data.data.is_liked,
                            });
                          }
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
                        addToShoppingListByRecipes([recipeData.id], recipeData.servingsCnt).then((response) => {
                          if (response.data.success && response.data.data) {
                            toast.success(t('recipe.update_shopping_list.success'));
                          }
                        }).catch(() => { });
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
                        prepareRecipe(recipeId).then((response) => {
                          if (response.data.success && response.data.data) {
                            setRecipeData({
                              ...recipeData,
                              isPrepared: response.data.data.is_prepared,
                            });
                          }
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
                          {`${t(getWeigthUnit(settings.measurement), { COUNT: ingredient.weight })}.
                          ${ingredient.name_i18n}`}
                          {ingredient.weight === 0 ? ` (${t('recipe.taste')})` : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='recipe__manufacture'>
                    <h2 className='recipe__manufacture-title sect-subtitle'>
                      {t('recipe.manufacture')}
                    </h2>
                    {recipeData.videoUrl && (
                      <div className='recipe__manufacture-video'>
                        <iframe
                          title='video'
                          width='100%'
                          height='400px'
                          src={getVideo(recipeData.videoUrl)}
                          allowFullScreen
                        />
                      </div>
                    )}
                    <div className='recipe__manufacture-desc'>
                      {recipeData.preparation}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='recipe__actions'>
                  <Link
                    to={{
                      pathname: routes.createRecipe,
                      propsRecipeId: recipeId,
                    }}
                    className='recipe__actions-button card-bg'
                  >
                    <div className='recipe__actions-button-media'>
                      <FileDyskIcon />
                    </div>
                    <div className='recipe__actions-button-desc'>
                      {t('recipe.save')}
                    </div>
                    <div className='recipe__actions-button-checked'>
                      <CheckedIcon className='recipe__actions-button-checked-icon' />
                    </div>
                  </Link>
                  <div ref={changedBlockRef} className='recipe__actions-button-wrap'>
                    <button
                      type='button'
                      onClick={() => setIsBlockActive(!isBlockActive)}
                      className={classnames('recipe__actions-button card-bg', {
                        active: isBlockActive || addNoteForm.note,
                      })}
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
                    {isBlockActive && (
                      <div className='recipe__notes-modal'>
                        <div className='recipe__notes-modal-wrap card-bg'>
                          <div className='recipe__notes-modal-title'>
                            {t('recipe.add_note.desc')}
                          </div>
                          <InputField
                            block
                            type='textarea'
                            name='note'
                            errors={getFieldErrors('note')}
                            value={addNoteForm.note}
                            onChange={(e) => validateOnChange('note', e.target.value, e)}
                            className='recipe__notes-modal-textarea'
                            border='light'
                            rows={10}
                          />
                          <Button
                            color='primary'
                            disabled={!addNoteForm.note}
                            onClick={() => {
                              addRecipeNote(recipeId, addNoteForm.note).then((response) => {
                                if (response.data.success && response.data.data) {
                                  toast.success(t('recipe.add_note.success'));

                                  setIsBlockActive(false);
                                }
                              }).catch(() => {
                                toast.error(t('recipe.add_note.error'));
                              });
                            }}
                            className='recipe__notes-modal-btn'
                          >
                            {t('recipe.add_note.save')}
                          </Button>
                        </div>
                        <button
                          type='button'
                          onClick={() => setIsBlockActive(false)}
                          className='recipe__notes-modal-close'
                        >
                          <CloseIconLogo />
                        </button>
                      </div>
                    )}
                  </div>
                  {recipeData.isOwner && (
                    <button
                      type='button'
                      onClick={() => setIsActiveDeleteModal(true)}
                      className={classnames('recipe__actions-button card-bg', {
                        active: isActiveDeleteModal,
                      })}
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
                  <Modal
                    withCloseBtn
                    shouldCloseOnOverlayClick
                    isOpen={isActiveDeleteModal}
                    onClose={() => setIsActiveDeleteModal(false)}
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
                        onClick={() => setIsActiveDeleteModal(false)}
                        className='recipe__modal-btn'
                      >
                        {t('common.no')}
                      </Button>
                    </div>
                  </Modal>
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
                    <span>{t('common.kcal', { COUNT: recipeData.calorie })}</span>
                  </div>
                  <div className='recipe__nutrients-composition-list'>
                    {recipeData.salt && (
                      <div className='recipe__nutrients-composition-item'>
                        <span>{t('common.salt')}</span>
                        <span>
                          {t(getWeigthUnit(settings.measurement), { COUNT: recipeData.salt })}
                        </span>
                      </div>
                    )}
                    {recipeData.fat && (
                      <div className='recipe__nutrients-composition-item'>
                        <span>{t('common.fats')}</span>
                        <span>
                          {t(getWeigthUnit(settings.measurement), { COUNT: recipeData.fat })}
                        </span>
                      </div>
                    )}
                    {recipeData.sugar && (
                      <div className='recipe__nutrients-composition-item'>
                        <span>{t('common.sugar')}</span>
                        <span>
                          {t(getWeigthUnit(settings.measurement), { COUNT: recipeData.sugar })}
                        </span>
                      </div>
                    )}
                    {recipeData.protein && (
                      <div className='recipe__nutrients-composition-item'>
                        <span>{t('common.proteins')}</span>
                        <span>
                          {t(getWeigthUnit(settings.measurement), { COUNT: recipeData.protein })}
                        </span>
                      </div>
                    )}
                    {recipeData.carbohydrate && (
                      <div className='recipe__nutrients-composition-item'>
                        <span>{t('common.carbohydrates')}</span>
                        <span>
                          {t(getWeigthUnit(settings.measurement), { COUNT: recipeData.carbohydrate })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='recipe__share card-bg'>
                  <div className='recipe__share-title'>
                    {t('socials.share.title')}
                  </div>
                  <ShareButtons
                    shareLink={window.location.href}
                    className='recipe__share-buttons'
                    visible
                  />
                </div>
                {recipeData.wines.length > 0 && (
                  <div className='recipe__advertising card-bg'>
                    <div className='recipe__advertising-title'>
                      {t('recipe.matching_wines')}
                    </div>
                    {recipeData.wines.map((wine) => (
                      <div
                        key={wine.name_i18n}
                        className='recipe__advertising-wrap'
                      >
                        <a href={wine.url} className='recipe__advertising-media'>
                          <img src={wine.image_url} alt='' />
                        </a>
                        <div className='recipe__advertising-text'>
                          <a href={wine.url} className='recipe__advertising-text-title'>
                            {wine.name_i18n}
                          </a>
                          <div className='recipe__advertising-text-desc'>
                            {wine.description_i18n}
                          </div>
                          <a
                            href={wine.url}
                            className='recipe__advertising-text-btn'
                            rel='noreferrer'
                            target='_blank'
                          >
                            {t('recipe.buy_here')}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {recipeData.similar?.length > 0 && (
                  <div className='recipe__similar-recipes card-bg'>
                    <div className='recipe__similar-recipes-title'>
                      {t('recipe.similar_recipes')}
                    </div>
                    <div className='recipe__similar-recipes-list'>
                      {recipeData.similar.map((similarRecipe) => (
                        <div key={similarRecipe.id} className='recipe__similar-recipes-item'>
                          <Link
                            to={props.location.fromMealPlan ? {
                              pathname: routes.getRecipeFullView(similarRecipe.id),
                              fromMealPlan: true,
                            } : routes.getRecipeFullView(similarRecipe.id)}
                            onClick={() => scrollToTop()}
                            className='recipe__similar-recipes-item-media'
                          >
                            <img src={similarRecipe.image_url} alt='' />
                            <CursorTouchLogo className='recipe__similar-recipes-item-media-icon' />
                          </Link>
                          <div className='recipe__similar-recipes-item-text'>
                            <Link
                              to={props.location.fromMealPlan ? {
                                pathname: routes.getRecipeFullView(similarRecipe.id),
                                fromMealPlan: true,
                              } : routes.getRecipeFullView(similarRecipe.id)}
                              onClick={() => scrollToTop()}
                              className='recipe__similar-recipes-item-text-name'
                            >
                              {similarRecipe.name_i18n}
                            </Link>
                            <div className='recipe__similar-recipes-item-text-meal-time'>
                              {similarRecipe.mealtime_codes.map((mealTimeItem) => (
                                <span
                                  key={mealTimeItem.code}
                                  className='recipe__similar-recipes-item-text-meal-time-block'
                                >
                                  {t(mealTimeItem.i18n_code)}
                                </span>
                              ))}
                            </div>
                            <div className='recipe__similar-recipes-item-text-info'>
                              {similarRecipe.time && (
                                <div className='recipe__similar-recipes-item-text-info-time'>
                                  {t('common.min', { COUNT: similarRecipe.time })}
                                </div>
                              )}
                              <div className='recipe__similar-recipes-item-text-info-cost-level'>
                                {similarRecipe.cost_level && (
                                  costLevelLabel[similarRecipe.cost_level]
                                )}
                              </div>
                            </div>
                          </div>
                          {/* <button
                            type='button'
                            className='recipe__similar-recipes-item-reload-btn'
                          >
                            <div className='recipe__similar-recipes-item-reload-btn-text'>
                              {t('recipe.replace')}
                            </div>
                            <div className='recipe__similar-recipes-item-reload-btn-icon'>
                              <ReloadGrayIcon />
                            </div>
                          </button> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
