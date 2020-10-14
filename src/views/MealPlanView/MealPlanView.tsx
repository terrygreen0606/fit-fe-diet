import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  getTranslate,
  getScrollbarSize,
  getLangUser,
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
  dataForTodayActivities,
} from './dataForMealPlanView';

const MealPlanView = (props: any) => {
  const { localePhrases, afterSignup } = props;
  const { width } = useWindowSize();
  const [afterSignUp, setAfterSignUp] = useState(afterSignup);
  const [tourStep, setTourStep] = useState(0);
  const { scrollbarWidth } = getScrollbarSize();
  const [todayActivities, setTodayActivities] = useState(['workout_add']);

  const { settings, storage } = props;

  const [days, setDays] = useState<any[]>([]);

  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const [daysToEndSubscription, setDaysToEndSubscription] = useState<number>(0);

  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);
  const [isMealPlanLoading, setIsMealPlanLoading] = useState<boolean>(true);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const onAction = () => {
    setAfterSignUp(false);
    setTourStep(1);
  };

  useEffect(() => {
    if (tourStep === 3) props.changeSetting('afterSignup', false);

    tourStepFunction(width, tourStep);
  }, [tourStep]);

  useEffect(() => {
    if (afterSignUp || tourStep > 0) {
      document.querySelector('body').classList.add('overflow-y-hidden');
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.querySelector('body').classList.remove('overflow-y-hidden');
      document.body.style.marginRight = '0px';
    }
  }, [afterSignUp, tourStep]);

  const onActivitiesChange = (e) => {
    e.persist();
    return e.target.checked
      ? setTodayActivities((prev) => [...prev, e.target.value])
      : setTodayActivities((prev) => [
        ...prev.slice(0, prev.indexOf(e.target.value)),
        ...prev.slice(prev.indexOf(e.target.value) + 1),
      ]);
  };

  useEffect(() => {
    let cleanComponent = false;
    const updatedDays = [];

    if (settings.is_private && !cleanComponent) {
      for (let i = 0; i < 7; i++) {
        const today = new Date();
        today.setDate(today.getDate() + i);
        updatedDays.push({
          id: i,
          dayLabel: today.toLocaleDateString(getLangUser(), { weekday: 'short' }),
          dayNumber: today.toLocaleDateString(getLangUser(), { day: 'numeric' }),
          dayFullInfo: today.toLocaleDateString(getLangUser(), {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        });
      }

      setDays(updatedDays);

      getMealPlan().then((response) => {
        if (response.data.success && response.data.data) {
          const updatedMealPlan = [];
          const { list } = response.data.data;

          const today = new Date();

          const todayTs = moment(today.setHours(-(new Date().getTimezoneOffset() / 60), 0, 0, 0)).unix();

          list.forEach((item, itemIndex) => {
            if (item.date_ts !== todayTs && itemIndex === 0) {
              for (let i = todayTs; i < item.date_ts; i += 86400) {
                updatedMealPlan.push({
                  date_ts: i,
                  list: [],
                });
              }
            }
            if (itemIndex === 0) {
              updatedMealPlan.push({
                date_ts: item.date_ts,
                list: [item],
              });
            } else {
              updatedMealPlan.find((findItem, findItemIndex) => {
                if (findItem.date_ts === item.date_ts) {
                  findItem.list.push(item);
                  return;
                }
                if (updatedMealPlan.length - 1 === findItemIndex) {
                  if (item.date_ts - updatedMealPlan[findItemIndex].date_ts !== 86400) {
                    for (let i = updatedMealPlan[findItemIndex].date_ts + 86400; i < item.date_ts; i += 86400) {
                      updatedMealPlan.push({
                        date_ts: i,
                        list: [],
                      });
                    }
                  }
                  updatedMealPlan.push({
                    date_ts: item.date_ts,
                    list: [item],
                  });
                }
              });
            }
          });
          if (updatedMealPlan.length !== 7) {
            for (let i = updatedMealPlan.length; updatedMealPlan.length < 7; i++) {
              const newTime = {
                date_ts: updatedMealPlan[updatedMealPlan.length - 1].date_ts + 86400,
                list: [],
              };
              updatedMealPlan.push(newTime);
            }
          }
          setMealPlan(updatedMealPlan);
        }
      }).catch(() => { }).finally(() => {
        setIsMealPlanLoading(false);
      });

      const paidBeforeDate = new Date(settings.paid_until * 1000).valueOf();
      const currentDate = new Date().valueOf();
      const diff = (paidBeforeDate - currentDate) / (60 * 60 * 24 * 1000);
      setDaysToEndSubscription(Math.round(diff));
      setIsNoAccess(false);
    }

    return () => cleanComponent = true;
  }, [settings.paid_until, settings.is_private]);

  const likeRecipeFunc = (mealPlanItemIndex: number, recipeItemIndex: number, recipeId: string) => {
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

  const prepareRecipeFunc = (mealPlanItemIndex: number, recipeItemIndex: number, recipeId: string) => {
    const updatedMealPlan = [...mealPlan];
    updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared =
      !updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared;

    setMealPlan([...updatedMealPlan]);

    prepareRecipe(recipeId).catch(() => {
      updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared =
        !updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex].is_prepared;

      setMealPlan([...updatedMealPlan]);
    });
  };

  const updateRecipe = (dateTs: number, recipeId: string, mealPlanItemIndex: number, recipeItemIndex: number) => {
    changeRecipeInMealPlan(dateTs, recipeId).then((response) => {
      if (response.data.success && response.data.data) {
        const updatedMealPlan = [...mealPlan];
        updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex] = response.data.data;
        setMealPlan([...updatedMealPlan]);
      }
    }).catch(() => { });
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
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('nutrition.title')}
        />
      </div>
      {afterSignUp && (
        <SiteTour
          data={mockData}
          onAction={onAction}
          localePhrases={localePhrases}
        />
      )}

      {(tourStep > 0 || afterSignUp) && <div className='hint_sect_backdrop' />}

      <ContentLoading
        isLoading={isMealPlanLoading}
        isError={false}
        spinSize='lg'
      >
        {isNoAccess ? (
          <div className='container'>
            <div>
              <span className='sect-subtitle'>
                {t('common.no_access')}
              </span>
            </div>
          </div>
        ) : (
            <section className='nutrition-plan-card-list-sect'>
              <div className='container'>
                <div className='row'>
                  <div
                    className={classnames(
                      'nutrition-plan-card-list-col nutrition-plan-list',
                      {
                        hinted: tourStep === 2,
                      },
                    )}
                  >
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
                          items={['twitter', 'telegram']}
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
                              {dayItem.dayFullInfo}
                            </span>
                          </div>
                          <ContentLoading
                            isLoading={mealPlan[dayItemIndex]?.list?.length === 0}
                            isError={false}
                            spinSize='lg'
                            label={t('mp.generating_recipes')}
                          />
                          <div className='row'>
                            {mealPlan[dayItemIndex]?.list.map((recipeItem, recipeItemIndex) => (
                              <div
                                key={recipeItem.id}
                                className='col-xl-6'
                              >
                                <NutritionPlanCard
                                  title={recipeItem.name_i18n}
                                  imgSrc={recipeItem.image_url}
                                  linkToRecipe={routes.getRecipeFullView(recipeItem.id)}
                                  favouriteActive={recipeItem.is_liked}
                                  checkedActive={recipeItem.is_prepared}
                                  time={recipeItem.time}
                                  desc={recipeItem.desc_i18n ? `${recipeItem.desc_i18n.substr(0, 50)}...` : ''}
                                  costLevel={costLevelLabel[recipeItem.cost_level]}
                                  onClickFavourite={() =>
                                    likeRecipeFunc(dayItemIndex, recipeItemIndex, recipeItem.id)}
                                  onClickChecked={() =>
                                    prepareRecipeFunc(dayItemIndex, recipeItemIndex, recipeItem.id)}
                                  onClickShopCart={() => addToShoppingListByRecipes([recipeItem.id])}
                                  onClickReload={() =>
                                    updateRecipe(
                                      mealPlan[dayItemIndex].date_ts,
                                      recipeItem.id,
                                      dayItemIndex,
                                      recipeItemIndex,
                                    )}
                                />
                              </div>
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
                      <TodayActivities
                        name={t('trainings.today_activities')}
                        items={dataForTodayActivities}
                        todayActivities={todayActivities}
                        onChange={onActivitiesChange}
                        type='checkbox'
                      />
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

                    <div className='nutrition-plan-socials card-bg'>
                      <h5 className='nutrition-plan-socials-title'>
                        {t('socials.share.title')}
                      </h5>
                      <ShareButtons
                        visible
                        items={['twitter', 'telegram']}
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

                    <div className='nutrition-plan-usage-time-card card-bg mt-5'>
                      <div className='nutrition-plan-usage-time-card-img text-left'>
                        <ClockIcon />
                      </div>

                      <div className='nutrition-plan-usage-time-card-content'>
                        <h5>
                          {t('nutrition.active_time')}
                        </h5>
                        <p
                          dangerouslySetInnerHTML={
                            { __html: t('nutrition.days_use', { COUNT: daysToEndSubscription }) }
                          }
                        />
                        <Link to={routes.checkout} className='nutrition-plan-usage-time-card-content-link'>
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
                          <h5>{t('personal.menu_diet')}</h5>
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
                            onClick={() => setTourStep(0)}
                            text={t('tour.hint.step3')}
                            closeText={t('common.understand')}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!storage.completedMealPlanTraining && (
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
                      props.toggleSetting('completedMealPlanTraining');
                    }}
                  />
                )}
              </div>
            </section>
          )}
      </ContentLoading>
    </>
  );
};

export default WithTranslate(
  connect((state: any) => ({
    settings: state.settings,
    storage: state.storage,
    afterSignup: state.storage.afterSignup,
  }), { toggleSetting, changeSetting })(MealPlanView),
);
