/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import {
  getTranslate,
  getScrollbarSize,
  getLocaleByLang,
} from 'utils';
import { routes } from 'constants/routes';
import { costLevelLabel } from 'constants/costLevelLabel';
import {
  getMealPlan,
  likeRecipe,
  prepareRecipe,
  addToShoppingListByRecipes,
  changeRecipeInMealPlan,
  getMealPlanText,
} from 'api';
import { toggleSetting, changeSetting } from 'store/actions';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import useWindowSize from 'components/hooks/useWindowSize';
import Button from 'components/common/Forms/Button';
import NutritionPlanCard from 'components/NutritionPlanCard';
import SiteTour from 'components/SiteTour';
import Breadcrumb from 'components/Breadcrumb';
import TodayActivities from 'components/TodayActivities';
import AdherenceDietPlan from 'components/AdherenceDietPlan';
import ShareButtons from 'components/ShareButtons';
import Advantages from 'components/Advantages';
import useOutsideClick from 'components/hooks/useOutsideClick';
import ContentLoading from 'components/hoc/ContentLoading';

import './MealPlanView.sass';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as CookCutIcon } from 'assets/img/icons/cook-cut-icon.svg';
import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';

import HintStep from './HintStep';
import {
  mockData,
  tourStepFunction,
} from './dataForMealPlanView';

const MealPlanView = (props: any) => {
  const {
    localePhrases,
    storage,
    settings,
    toggleSetting,
  } = props;
  const { width } = useWindowSize();
  const [isActiveTutorial, setIsActiveTutorial] = useState(storage.isActiveMealPlanTutorial);
  const [tourStep, setTourStep] = useState(0);
  const { scrollbarWidth } = getScrollbarSize();

  const [days, setDays] = useState<any[]>([]);

  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const [daysToEndSubscription, setDaysToEndSubscription] = useState<number>(0);

  const [isMealPlanLoading, setIsMealPlanLoading] = useState<boolean>(true);
  const [activeItemIdShopBtn, setActiveItemIdShopBtn] = useState<string>(null);
  const [activeItemIdReloadBtn, setActiveItemIdReloadBtn] = useState<string>(null);
  const [activeItemIdCheckedBtn, setActiveItemIdCheckedBtn] = useState<string>(null);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
    if (tourStep === 3) toggleSetting('isActiveMealPlanTutorial');

    tourStepFunction(width, tourStep);
  }, [tourStep]);

  useEffect(() => {
    if (isActiveTutorial || tourStep > 0) {
      document.querySelector('body').classList.add('overflow-y-hidden');
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.querySelector('body').classList.remove('overflow-y-hidden');
      document.body.style.marginRight = '0px';
    }
  }, [isActiveTutorial, tourStep]);

  useEffect(() => {
    let cleanComponent = false;
    const updatedDays = [];

    if (settings.is_private && !cleanComponent) {
      for (let i = 0; i < 7; i++) {
        const today = new Date();
        today.setDate(today.getDate() + i);
        updatedDays.push({
          id: i,
          dayLabel: today.toLocaleDateString(getLocaleByLang(settings.language), { weekday: 'short' }),
          dayNumber: today.toLocaleDateString(getLocaleByLang(settings.language), { day: 'numeric' }),
          dayFullInfo: today.toLocaleDateString(getLocaleByLang(settings.language), {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        });
      }

      setDays(updatedDays);

      getMealPlan().then(({ data }) => {
        if (data.success && data.data) {
          const updatedMealPlan = [];
          const list = data.data.list || [];

          list.forEach((item) => item.key_id = uuid());

          list.forEach((item, itemIndex) => {
            if (itemIndex === 0) {
              updatedMealPlan.push({
                date_ts: item.date_ts,
                list: [item],
              });
            } else if (list[itemIndex].date_ts === list[itemIndex - 1].date_ts) {
              updatedMealPlan.find((findItem) => {
                if (findItem.date_ts === item.date_ts) {
                  findItem.list.push(item);
                }
              });
            } else {
              updatedMealPlan.push({
                date_ts: item.date_ts,
                list: [item],
              });
            }
          });

          setMealPlan(updatedMealPlan);
        }
      }).catch(() => { }).finally(() => {
        setIsMealPlanLoading(false);
      });

      const paidBeforeDate = new Date(settings.paid_until * 1000).valueOf();
      const currentDate = new Date().valueOf();
      const diff = (paidBeforeDate - currentDate) / (60 * 60 * 24 * 1000);
      setDaysToEndSubscription(Math.round(diff));
    }

    return () => cleanComponent = true;
  }, [settings.paid_until, settings.is_private]);

  const likeRecipeClick = (mealPlanItemIndex: number, recipeItemIndex: number, recipeId: string) => {
    const updatedMealPlan = [...mealPlan];
    updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_liked =
      !updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_liked;

    setMealPlan([...updatedMealPlan]);

    likeRecipe(recipeId).catch(() => {
      updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_liked =
        !updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_liked;

      setMealPlan([...updatedMealPlan]);
    });
  };

  const prepareRecipeClick = (
    mealPlanItemIndex: number,
    recipeItemIndex: number,
    recipeId: string,
    dateTs: string,
  ) => {
    setActiveItemIdCheckedBtn(recipeId);
    const updatedMealPlan = [...mealPlan];

    prepareRecipe(dateTs, recipeId).then(() => {
      updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared =
        !updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared;

      setMealPlan([...updatedMealPlan]);
    }).catch(() => toast(t('common.error')))
      .finally(() => setActiveItemIdCheckedBtn(null));
  };

  const updateRecipe = (dateTs: number, recipeId: string, mealPlanItemIndex: number, recipeItemIndex: number) => {
    setActiveItemIdReloadBtn(recipeId);
    changeRecipeInMealPlan(dateTs, recipeId).then((response) => {
      if (response.data.success && response.data.data) {
        const updatedMealPlan = [...mealPlan];
        updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex] = response.data.data;
        setMealPlan([...updatedMealPlan]);
      }
    }).catch(() => toast.error(t('common.error')))
      .finally(() => setActiveItemIdReloadBtn(null));
  };

  const addToShopList = (itemId: string) => {
    setActiveItemIdShopBtn(itemId);

    addToShoppingListByRecipes([itemId])
      .then((response) => {
        if (response.data.success && response.data.data) {
          toast.success(t('recipe.update_shopping_list.success'));
        }
      })
      .catch(() => { })
      .finally(() => setActiveItemIdShopBtn(null));
  };

  const downloadTxtFile = () => {
    getMealPlanText().then((response) => {
      if (response.data.success && response.data.data) {
        const element = document.createElement('a');
        const file = new Blob([response.data.data.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'meal-plan.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    }).catch(() => { });
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.nutrition_plan')}</title>
      </Helmet>
      {isActiveTutorial && (
        <SiteTour
          data={mockData}
          onAction={() => {
            setIsActiveTutorial(false);
            setTourStep(1);
          }}
          localePhrases={localePhrases}
        />
      )}

      {(tourStep > 0 || isActiveTutorial) && <div className='hint_sect_backdrop' />}

      <ContentLoading
        isLoading={isMealPlanLoading}
        isError={false}
        spinSize='lg'
      >
        <section className='nutrition-plan-card-list-sect'>
          <div className='container'>
            <Breadcrumb
              routes={[
                {
                  url: routes.main,
                  name: t('breadcrumb.main'),
                },
              ]}
              currentPage={t('app.title.meal_plan')}
            />
            <div className='nutrition-plan-card-list-sect-wrap'>
              <div
                className={classnames(
                  'nutrition-plan-card-list-col nutrition-plan-list',
                  {
                    hinted: tourStep === 2,
                  },
                )}
              >
                <div className='nutrition-plan-card-list-header'>
                  <h2 className='nutrition-plan-card-list-title'>
                    {t('mp.list.title')}
                  </h2>
                  <div className='nutrition-plan-card-list-controls'>
                    <button
                      type='button'
                      onClick={() => downloadTxtFile()}
                      className='nutrition-plan-card-list-controls-item'
                    >
                      <FileDyskIcon />
                    </button>
                    <button
                      type='button'
                      onClick={() => window.print()}
                      className='nutrition-plan-card-list-controls-item'
                    >
                      <PrintIcon />
                    </button>
                    <div ref={changedBlockRef}>
                      <button
                        type='button'
                        onClick={() => setIsBlockActive(!isBlockActive)}
                        className='nutrition-plan-card-list-controls-item'
                      >
                        <ShareIcon />
                      </button>
                      <ShareButtons
                        visible={isBlockActive}
                        items={['twitter']}
                        fetchData={() => getMealPlanText().then((response) => {
                          if (response.data.success && response.data.data) {
                            return {
                              link: window.location.origin,
                              text: response.data.data.content,
                            };
                          }
                        }).catch(() => { })}
                      />
                    </div>
                  </div>
                </div>
                <div className='nutrition-plan-card-list-date'>
                  {days.map((item, itemIndex) => (
                    <button
                      key={item.id}
                      id={item.id}
                      type='button'
                      onClick={() => {
                        const scrollElements = document.querySelectorAll('[data-scroll]');
                        scrollElements.forEach((scrollItem) => {
                          if (+scrollItem.getAttribute('data-scroll') === item.id) {
                            scrollItem.scrollIntoView({ behavior: 'smooth' });
                          }
                        });
                      }}
                      className={classnames('nutrition-plan-card-list-date-item card-bg', {
                        active: itemIndex === 0,
                      })}
                    >
                      <div
                        className='nutrition-plan-card-list-date-item-number'
                      >
                        {item.dayNumber}
                      </div>
                      <div className='nutrition-plan-card-list-date-item-day-week'>
                        {item.dayLabel}
                      </div>
                    </button>
                  ))}
                </div>
                <div className='nutrition-plan-card-list-recipes'>
                  {days.map((dayItem, dayItemIndex) => (
                    <div
                      key={dayItem.id}
                      data-scroll={dayItem.id}
                      className='nutrition-plan-card-list-recipes-item card-bg'
                    >
                      <div className='nutrition-plan-card-list-recipes-item-title'>
                        <CalendarIcon />
                        <span>
                          {t('mp.date.desc', { PERIOD: dayItem.dayFullInfo })}
                        </span>
                      </div>
                      <div className='row'>
                        {mealPlan[dayItemIndex]?.list.map((recipeItem, recipeItemIndex) => (
                          !recipeItem.is_generated && !recipeItem.id ? (
                            <div key={recipeItem.key_id} className='col-xl-6'>
                              <div className='card-bg nutrition-plan-empty-recipe'>
                                <ContentLoading
                                  isLoading
                                  isError={false}
                                  spinSize='lg'
                                  label={t('mp.generating_recipes')}
                                />
                              </div>
                            </div>
                          ) : (
                              <React.Fragment key={recipeItem.key_id}>
                                {recipeItem.id ? (
                                  <div className='col-xl-6'>
                                    <NutritionPlanCard
                                      title={recipeItem.name_i18n}
                                      imgSrc={recipeItem.image_url}
                                      linkToRecipe={{
                                        pathname: routes.getRecipeFullView(recipeItem.id),
                                        fromMealPlan: true,
                                        dateTs: mealPlan[dayItemIndex].date_ts,
                                        isActivePrepared: recipeItem.is_prepared,
                                      }}
                                      favouriteActive={recipeItem.is_liked}
                                      checkedActive={recipeItem.is_prepared}
                                      time={recipeItem.time}
                                      desc={recipeItem.desc_i18n ? `${recipeItem.desc_i18n.substr(0, 50)}...` : ''}
                                      costLevel={costLevelLabel[recipeItem.cost_level]}
                                      onClickFavourite={() => likeRecipeClick(
                                        dayItemIndex,
                                        recipeItemIndex,
                                        recipeItem.id,
                                      )}
                                      onClickChecked={() => prepareRecipeClick(
                                        dayItemIndex,
                                        recipeItemIndex,
                                        recipeItem.id,
                                        recipeItem.date_ts,
                                      )}
                                      onClickShopCart={() => addToShopList(recipeItem.id)}
                                      onClickReload={() =>
                                        updateRecipe(
                                          mealPlan[dayItemIndex].date_ts,
                                          recipeItem.id,
                                          dayItemIndex,
                                          recipeItemIndex,
                                        )}
                                      isLoadingShopBtn={activeItemIdShopBtn === recipeItem.id}
                                      isLoadingReloadBtn={activeItemIdReloadBtn === recipeItem.id}
                                      isLoadingCheckedBtn={activeItemIdCheckedBtn === recipeItem.id}
                                    />
                                  </div>
                                ) : (
                                    <div className='col-xl-6'>
                                      <div className='card-bg nutrition-plan-empty-recipe'>
                                        {t('mp.no_found_recipe')}
                                      </div>
                                    </div>
                                  )}
                              </React.Fragment>
                            )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {tourStep === 2 && (
                  <HintStep
                    hintStep={2}
                    onClick={() => setTourStep(3)}
                    text={t('tour.hint.step2')}
                    closeText={t('common.understand')}
                  />
                )}
              </div>
              <div className='nutrition-plan-info-col'>
                <div
                  className={classnames('nutrition-plan-info-col-today-activities', {
                    hinted: tourStep === 1,
                  })}
                >
                  <TodayActivities />
                  {tourStep === 1 && (
                    <HintStep
                      hintStep={1}
                      onClick={() => setTourStep(2)}
                      text={t('tour.hint.step1')}
                      closeText={t('common.understand')}
                    />
                  )}
                </div>

                <AdherenceDietPlan
                  todayProgress={0}
                  weekProgress={20}
                />

                <div className='nutrition-plan-usage-time-card card-bg mt-5'>
                  <div className='nutrition-plan-usage-time-card-img text-left'>
                    <ClockIcon />
                  </div>

                  <div className='nutrition-plan-usage-time-card-content'>
                    <h2>
                      {t('nutrition.active_time')}
                    </h2>
                    <p
                      dangerouslySetInnerHTML={
                        { __html: t('nutrition.days_use', { COUNT: daysToEndSubscription }) }
                      }
                    />
                    <Link to={routes.subscriptionPlanSettings} className='nutrition-plan-usage-time-card-content-link'>
                      <Button className='mt-3' color='primary'>
                        {t('nutrition.subscription')}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div
                  className={classnames(
                    'nutrition-plan-diet-settings-card-back',
                    {
                      hinted: tourStep === 3,
                    },
                  )}
                >
                  <div className='nutrition-plan-diet-settings-card card-bg mt-5'>
                    <div className='nutrition-plan-diet-settings-card-img text-left'>
                      <MealIcon />
                    </div>

                    <div className='nutrition-plan-diet-settings-card-content'>
                      <h2>{t('personal.menu_diet')}</h2>
                      <p>{t('nutrition.settings.text')}</p>
                      <Link to={routes.changeMealSettings} className='nutrition-plan-usage-time-card-content-link'>
                        <Button className='mt-3' outline color='secondary'>
                          {t('nutrition.starter')}
                        </Button>
                      </Link>
                    </div>

                    {tourStep === 3 && (
                      <HintStep
                        hintStep={3}
                        onClick={() => {
                          setTourStep(0);
                          window.location.reload();
                        }}
                        text={t('tour.hint.step3')}
                        closeText={t('common.understand')}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {storage.isActiveMealPlanBanner && (
              <Advantages
                icon1={CookCutIcon}
                icon2={MealIcon}
                icon3={DumbbellIcon}
                mainTitle={t('nutrition.plan.title')}
                advantage1Title={t('nutrition.plan.feat1_title')}
                advantage1Desc={t('nutrition.plan.feat1_desc')}
                advantage2Title={t('nutrition.plan.feat2_title')}
                advantage2Desc={t('nutrition.plan.feat2_desc')}
                advantage3Title={t('nutrition.plan.feat3_title')}
                advantage3Desc={t('nutrition.plan.feat3_desc')}
                isShowBtn
                onClickShowBtn={() => {
                  toggleSetting('isActiveMealPlanBanner');
                }}
              />
            )}
          </div>
        </section>
      </ContentLoading>
    </>
  );
};

export default WithTranslate(
  connect((state: any) => ({
    settings: state.settings,
    storage: state.storage,
  }), { toggleSetting, changeSetting })(MealPlanView),
);
