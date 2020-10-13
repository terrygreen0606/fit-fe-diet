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
} from 'api';
import FormValidator from 'utils/FormValidator';

import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Banner from 'components/Banner';
import Button from 'components/common/Forms/Button';
import Modal from 'components/common/Modal';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import InputField from 'components/common/Forms/InputField';

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

  const { settings } = props;

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

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const getData = () => {
    getDataStatsForPeriod(trackerPeriod).then((response) => {
      const { data } = response.data;

      if (response.data.status && response.data.data) {
        if (trackerPeriod === periods.week) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('HH:mm'),
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
    });
  };

  useEffect(() => {
    getData();
  }, [trackerPeriod]);

  useEffect(() => {
    getDataStatsForToday().then((response) => {
      const { data } = response.data;

      console.log('data.drinks', data.drinks);

      if (response.data.success && response.data.data) {
        setMainTodayData({
          ...mainTodayData,
          completed: data.completed,
          actLevel: data.act_level,
          completedPercent: data.completed_percent,
          cups: getCupList(data.cups),
          dailyGoal: data.dailyGoal,
          drinks: [...data.drinks],
          unit: data.unit,
        });
      }
    });
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

  const checkingMeasurement = (measurement: string) => (measurement === 'si' ? 'us' : 'si');

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
          console.log(response.data.data);
          setAddDrinkForm({
            ...addDrinkForm,
            amount: null,
            measurement: settings.measurement,
          });

          setIsModalActive(false);
        })
        .catch(() => {
          toast.error(t('wt.add_drink.error'));
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.water_tracker')}</title>
      </Helmet>
      <div className='waterTracker'>
        <Modal
          withCloseBtn
          shouldCloseOnOverlayClick
          onClose={() => setIsModalActive(false)}
          isOpen={isModalActive}
          className='waterTracker_popup'
        >
          <h4 className='waterTracker_popup-title'>
            {t('wt.add_drink')}
          </h4>
          <CustomSwitch
            label1={t('common.oz_label')}
            label2={t('common.ml_label')}
            checked={addDrinkForm.measurement === 'si'}
            onChange={() => {
              const newMeasurement = checkingMeasurement(addDrinkForm.measurement);

              setAddDrinkForm({
                ...addDrinkForm,
                measurement: newMeasurement,
              });
            }}
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
                  {t('common.ml', { COUNT: item.count })}
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
                  data-param='0'
                  data-validate='["min", "required"]'
                  errors={getFieldErrors('amount')}
                  value={addDrinkForm.amount}
                  onChange={(e) => validateOnChange('amount', e.target.value, e)}
                  min={0}
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
          <h4 className='waterTracker_title'>
            <span className='waterTracker_title-text'>
              {t('wt.head_title')}
            </span>
          </h4>
          <Banner
            items={bannerData}
            imageSize='lg'
          />
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
                <WaterChart labels={chartsData.label} data={chartsData.data} />
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
                            {/* {moment(item.created_at).toDate()} */}
                          </div>
                        </div>
                        <div className='waterTracker_daynorm-item-wrap'>
                          <div className='waterTracker_daynorm-item-size'>
                            {t('common.ml', { COUNT: item.amount })}
                          </div>
                          <button
                            type='button'
                            className='waterTracker_daynorm-item-btn-trash'
                          >
                            <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className='waterTracker_daynorm-delete'>
                      <span>{t('wt.delete')}</span>
                      <button
                        type='button'
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
                      {mainTodayData.dailyGoal}
                      {t('common.ml_label')}
                    </h5>
                  </div>
                  <div className='log-drink-wrap'>
                    <Button
                      color='secondary'
                      onClick={() => setIsModalActive(true)}
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
                    {t('wt.day_average')}
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
                    {`${mainTodayData.completed} ${t('common.ml_label')}`}
                  </span>
                </div>
                <div className='waterTracker_stats'>
                  <div>
                    {t('common.daily_goal')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {`${mainTodayData.dailyGoal} ${t('common.ml_label')}`}
                  </span>
                </div>
                <div className='waterTracker_stats'>
                  <div>
                    {t('common.average')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {`${statsData.dayAverage} ${t('common.ml_label')}`}
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
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    settings: state.settings,
  }),
)(WaterTrackerView));
