/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import moment from 'moment';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import {
  getDataStatsForPeriod,
  getDataStatsForToday,
  addDrink,
  removeDrink,
  userUpdateMeasurement,
} from 'api';
import FormValidator from 'utils/FormValidator';
import { setAppSetting, toggleSetting } from 'store/actions';

import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Banner from 'components/Banner';
import Button from 'components/common/Forms/Button';
import Modal from 'components/common/Modal';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import InputField from 'components/common/Forms/InputField';
import useOutsideClick from 'components/hooks/useOutsideClick';
import ContentLoading from 'components/hoc/ContentLoading';

import './WaterTrackerView.sass';

import { ReactComponent as DropIcon } from 'assets/img/icons/drop-icon.svg';
import { ReactComponent as TrashLineIcon } from 'assets/img/icons/trash-line-icon.svg';

import WaterChart from './WaterChart';

import {
  bannerData,
  periods,
  getCupList,
} from './dataForWaterTracker';

const WaterTrackerView = (props: any) => {
  const t = (code: string, placeholder?: any) => getTranslate(props.localePhrases, code, placeholder);

  const {
    settings,
    storage,
    toggleSetting,
  } = props;

  const [trackerPeriod, setTrackerPeriod] = useState<string>(periods.week);

  const [statsData, setStatsData] = useState<{
    dayAverage: number,
    drinkFrequency: number,
  }>({
    dayAverage: 0,
    drinkFrequency: 0,
  });

  const [mainTodayData, setMainTodayData] = useState<{
    actLevel: string,
    completed: number,
    completedPercent: number,
    cups: any[],
    dailyGoal: number,
    drinks: any[],
    unit: string,
  }>({
    actLevel: '',
    completed: 0,
    completedPercent: 0,
    cups: [],
    dailyGoal: 0,
    drinks: [],
    unit: 'ml',
  });

  const [chartsData, setChartsData] = useState<{
    label: string[],
    data: number[],
  }>({
    label: [],
    data: [],
  });

  const [addDrinkForm, setAddDrinkForm] = useState<{
    amount: number,
    measurement: 'si' | 'us',
  }>({
    amount: null,
    measurement: settings.measurement,
  });

  const [isModalAddDrinkActive, setIsModalAddDrinkActive] = useState<boolean>(false);
  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const [isWaterTrackerLoading, setIsWaterTrackingLoading] = useState<boolean>(true);

  const [deleteDrinkId, setDeleteDrinkId] = useState<string>();

  const checkingMeasurement = (measurement: string) => (measurement === 'si' ? 'us' : 'si');

  const getData = () => {
    getDataStatsForPeriod(trackerPeriod).then((response) => {
      if (response.data.status && response.data.data) {
        const { data } = response.data;

        if (trackerPeriod === periods.week) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('DD:MM'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        } else if (trackerPeriod === periods.month) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('D MMM'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        } else if (trackerPeriod === periods.year) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('MMM'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        }

        setStatsData({
          ...statsData,
          dayAverage: data.day_average,
          drinkFrequency: data.frequency,
        });
      }
    }).catch(() => { });
  };

  const updateMainTodayData = (data) => {
    setMainTodayData({
      ...mainTodayData,
      completed: data.completed,
      actLevel: data.act_level,
      completedPercent: data.completed_percent,
      cups: getCupList(data.cups),
      dailyGoal: data.daily_goal,
      drinks: [...data.drinks],
      unit: data.unit,
    });
  };

  useEffect(() => {
    getData();
  }, [trackerPeriod, addDrinkForm.measurement]);

  useEffect(() => {
    getDataStatsForToday().then((response) => {
      const { data } = response.data;

      if (response.data.success && response.data.data) {
        updateMainTodayData(data);
      }

      setIsWaterTrackingLoading(false);
    }).catch(() => { });
  }, []);

  const setDrinkCount = (item, itemIndex) => {
    const updatedButtons = [...mainTodayData.cups];
    updatedButtons.map((updatedItem) => {
      updatedItem.isActive = false;
    });

    updatedButtons[itemIndex].isActive = true;

    setMainTodayData({
      ...mainTodayData,
      cups: [...updatedButtons],
    });

    setAddDrinkForm({
      ...addDrinkForm,
      amount: item.count,
    });
  };

  const [addDrinkErrors, setAddDrinkErrors] = useState<any[]>([]);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      addDrinkForm,
      setAddDrinkForm,
      addDrinkErrors,
      setAddDrinkErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, addDrinkErrors);

  const addDrinkSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setAddDrinkErrors([...errors]);

    if (!hasError) {
      addDrink(addDrinkForm.amount, addDrinkForm.measurement)
        .then((response) => {
          if (response.data.success && response.data.data) {
            const { data } = response.data;

            updateMainTodayData(data);

            setAddDrinkForm({
              ...addDrinkForm,
              amount: null,
              measurement: settings.measurement,
            });

            setIsModalAddDrinkActive(false);
          }
        })
        .catch(() => {
          toast.error(t('common.error'));
        });
    }
  };

  const deleteDrinkSubmit = () => {
    removeDrink(deleteDrinkId).then((response) => {
      if (response.data.success && response.data.data) {
        const { data } = response.data;

        updateMainTodayData(data);
        setDeleteDrinkId(null);
      }
    }).catch(() => {
      toast.error(t('common.error'));
    }).finally(() => {
      setIsBlockActive(false);
    });
  };

  const updateUserMeasurement = () => {
    const newMeasurement = checkingMeasurement(addDrinkForm.measurement);

    userUpdateMeasurement(newMeasurement).then((res) => {
      if (res.data.success) {
        props.setAppSetting({
          ...settings,
          measurement: newMeasurement,
        });

        getDataStatsForToday().then((response) => {
          if (response.data.success && response.data.data) {
            const { data } = response.data;

            updateMainTodayData(data);
            setAddDrinkForm({
              ...addDrinkForm,
              measurement: newMeasurement,
              amount: null,
            });
          }
        }).catch(() => { });
      }
    }).catch(() => { });
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.water_tracker')}</title>
      </Helmet>
      <section className='waterTracker'>
        <Modal
          withCloseBtn
          shouldCloseOnOverlayClick
          onClose={() => setIsModalAddDrinkActive(false)}
          isOpen={isModalAddDrinkActive}
          className='waterTracker_popup'
        >
          <h2 className='waterTracker_popup-title'>
            {t('wt.add_drink')}
          </h2>
          <CustomSwitch
            label1={t('common.oz_label')}
            label2={t('common.ml_label')}
            checked={addDrinkForm.measurement === 'si'}
            onChange={() => updateUserMeasurement()}
            className='waterTracker_popup-switch'
          />
          <div className='waterTracker_popup-buttons'>
            {mainTodayData.cups.map((item, itemIndex) => (
              <button
                key={item.id}
                type='button'
                className={classnames('waterTracker_popup-button', {
                  active: item.isActive,
                })}
                onClick={() => setDrinkCount(item, itemIndex)}
              >
                <div className='waterTracker_popup-button-media'>
                  {item.icon}
                </div>
                <div className='waterTracker_popup-button-desc'>
                  {`${item.count} ${mainTodayData.unit}`}
                </div>
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => addDrinkSubmit(e)}
            className='waterTracker_popup-form'
          >
            <div className='waterTracker_popup-form-input-wrap'>
              <InputField
                type='number'
                name='amount'
                data-param={settings.measurement === 'si' ? '50, 2000' : '2, 67'}
                data-validate='["min-max", "required"]'
                errors={getFieldErrors('amount')}
                value={addDrinkForm.amount}
                onChange={(e) => validateOnChange('amount', +e.target.value, e)}
                min={settings.measurement === 'si' ? 50 : 2}
                max={settings.measurement === 'si' ? 2000 : 67}
                className='waterTracker_popup-form-input'
                label={t('wt.value')}
              />
            </div>
            <div className='waterTracker_popup-form-button-wrap'>
              <Button
                type='submit'
                color='primary'
                className='waterTracker_popup-form-button'
                size='lg'
              >
                {t('common.add')}
              </Button>
            </div>
          </form>
        </Modal>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('wt.head_title')}
          />
          <ContentLoading
            isLoading={isWaterTrackerLoading}
            isError={false}
            spinSize='lg'
          >
            <h1 className='waterTracker_title sect-subtitle'>
              {t('wt.head_title')}
            </h1>
            {storage.isActiveWaterTrackerBanner && (
              <Banner items={bannerData} onAction={() => toggleSetting('isActiveWaterTrackerBanner')} />
            )}
            <div className='row'>
              <ul className='waterTracker_period'>
                <li
                  onClick={() => setTrackerPeriod(periods.week)}
                  className={classnames('waterTracker_period-item', {
                    'active-period': trackerPeriod === periods.week,
                  })}
                  role='presentation'
                >
                  {t('common.week')}
                </li>
                <li
                  onClick={() => setTrackerPeriod(periods.month)}
                  className={classnames('waterTracker_period-item', {
                    'active-period': trackerPeriod === periods.month,
                  })}
                  role='presentation'
                >
                  {t('common.month')}
                </li>
                <li
                  onClick={() => setTrackerPeriod(periods.year)}
                  className={classnames('waterTracker_period-item', {
                    'active-period': trackerPeriod === periods.year,
                  })}
                  role='presentation'
                >
                  {t('common.year')}
                </li>
              </ul>
            </div>

            <div className='row row-wrap mb-5'>
              <div className='col-xl-5'>
                <div className='waterTracker_chartwrap'>
                  {mainTodayData.dailyGoal && (
                    <WaterChart
                      labels={chartsData.label}
                      data={chartsData.data}
                      maxValue={mainTodayData.dailyGoal}
                    />
                  )}
                </div>
              </div>

              <div className='col-xl-7'>
                <div className='row'>
                  <div className='col-lg-8'>
                    <div className='waterTracker_daynorm'>
                      {mainTodayData.drinks.map((item) => (
                        <div
                          key={item.id}
                          className='waterTracker_daynorm-item'
                        >
                          <div className='waterTracker_daynorm-item-wrap'>
                            <DropIcon className='waterTracker_daynorm-item-drop' />
                            <div className='waterTracker_daynorm-item-time'>
                              {moment.unix(item.created_at).format('HH:mm')}
                            </div>
                          </div>
                          <div className='waterTracker_daynorm-item-wrap'>
                            <div className='waterTracker_daynorm-item-size'>
                              {`${item.amount} ${mainTodayData.unit}`}
                            </div>
                            <button
                              type='button'
                              onClick={() => {
                                setDeleteDrinkId(item.id);
                                setIsBlockActive(!isBlockActive);
                              }}
                              className='waterTracker_daynorm-item-btn-trash'
                            >
                              <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div
                        ref={changedBlockRef}
                        className={classnames('waterTracker_daynorm-delete', {
                          active: isBlockActive,
                        })}
                      >
                        <span>{t('wt.delete')}</span>
                        <button
                          type='button'
                          onClick={() => {
                            setIsBlockActive(false);
                            deleteDrinkSubmit();
                          }}
                          className='waterTracker_daynorm-delete-btn'
                        >
                          {t('common.yes')}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='col-lg-4 text-center'>
                    <div className='water-drop'>
                      <h3>
                        {`${mainTodayData.completedPercent}%`}
                      </h3>
                      <h5>
                        {`${mainTodayData.dailyGoal} ${mainTodayData.unit}`}
                      </h5>
                    </div>
                    <div className='log-drink-wrap'>
                      <Button
                        color='secondary'
                        onClick={() => setIsModalAddDrinkActive(true)}
                        className='log-drink-btn'
                      >
                        {t('wt.log_drink')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row row-wrap align-items-end'>
              <div className='col-xl-5'>
                <div className='waterTracker_info'>
                  <div className='waterTracker_info-item'>
                    <div className='waterTracker_info-item-title'>
                      {t('common.day_average')}
                    </div>
                    <div className='waterTracker_info-item-desc'>
                      <div className='waterTracker_info-item-desc-selected'>
                        {statsData.dayAverage}
                      </div>
                      {`${mainTodayData.unit} / ${t('common.day')}`}
                    </div>
                  </div>
                  <div className='waterTracker_info-item'>
                    <div className='waterTracker_info-item-title'>
                      {t('wt.drink_frequency')}
                    </div>
                    <div className='waterTracker_info-item-desc'>
                      <div className='waterTracker_info-item-desc-selected'>
                        {statsData.drinkFrequency}
                      </div>
                      {t('wt.drink_frequency_count')}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-xl-7'>
                <div className='waterTracker_stats-wrap'>
                  <div className='waterTracker_stats'>
                    <div>
                      {t('wt.complete')}
                    </div>
                    <span className='waterTracker_stats-value'>
                      {`${mainTodayData.completed} ${mainTodayData.unit}`}
                    </span>
                  </div>
                  <div className='waterTracker_stats'>
                    <div>
                      {t('common.daily_goal')}
                    </div>
                    <span className='waterTracker_stats-value'>
                      {`${mainTodayData.dailyGoal} ${mainTodayData.unit}`}
                    </span>
                  </div>
                  <div className='waterTracker_stats'>
                    <div>
                      {t('common.average')}
                    </div>
                    <span className='waterTracker_stats-value'>
                      {`${statsData.dayAverage} ${mainTodayData.unit}`}
                    </span>
                  </div>
                  <div className='waterTracker_stats'>
                    <div>
                      {t('wt.status')}
                    </div>
                    <span className='waterTracker_stats-value'>
                      {t(mainTodayData.actLevel)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContentLoading>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
  storage: state.storage,
}), { setAppSetting, toggleSetting })(WaterTrackerView));
