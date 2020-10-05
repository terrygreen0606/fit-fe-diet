/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import {
  getTranslate,
  getScrollbarSize,
  getLangUser,
} from 'utils';
import { routes } from 'constants/routes';
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

  const costLevelLabel = {
    1: '$',
    2: '$$',
    3: '$$$',
  };

  const [days, setDays] = useState<any[]>([]);

  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const [daysToEndSubscription, setDaysToEndSubscription] = useState<number>(0);

  const [shareText, setShareText] = useState<string>('');

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
      if (settings.paid_until > 0) {
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
          const updatedMealPlan = [];
          response.data.data.list.forEach((item, itemIndex) => {
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
                } if (updatedMealPlan.length - 1 === findItemIndex) {
                  updatedMealPlan.push({
                    date_ts: item.date_ts,
                    list: [item],
                  });
                }
              });
            }
          });
          setMealPlan(updatedMealPlan);
        });

        const paidBeforeDate = new Date(settings.paid_until * 1000).valueOf();
        const currentDate = new Date().valueOf();
        const diff = (paidBeforeDate - currentDate) / (60 * 60 * 24 * 1000);
        setDaysToEndSubscription(Math.round(diff));

        getMealPlanText().then((response) => setShareText(response.data.data.content));
        setIsNoAccess(false);
      } else {
        setIsNoAccess(true);
        setIsMealPlanLoading(false);
      }
    }

    return () => cleanComponent = true;
  }, [settings.paid_until, settings.is_private]);

  useEffect(() => {
    if (mealPlan.length > 0) {
      setIsMealPlanLoading(false);
    }
  }, [mealPlan.length]);

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
      const updatedMealPlan = [...mealPlan];
      updatedMealPlan[mealPlanItemIndex].list[recipeItemIndex] = response.data.data;
      setMealPlan([...updatedMealPlan]);
    });
  };

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([shareText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'meal-plan.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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
                    <ContentLoading
                      isLoading={mealPlan.length !== 7}
                      isError={false}
                      spinSize='lg'
                      label={t('mp.generating_recipes')}
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
                            shareText={shareText}
                            shareLink={window.location.origin}
                            isFacebookActive={false}
                            isWhatsappActive={false}
                          />
                        </div>
                      </div>
                      <div className='nutrition-plan-card-list-date'>
                        {days.map((item) => (
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
                            className='nutrition-plan-card-list-date-item card-bg'
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
                    </ContentLoading>
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
                        shareText={shareText}
                        shareLink={window.location.origin}
                        isFacebookActive={false}
                        isWhatsappActive={false}
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
