/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { InputError } from 'types';
import FormValidator from 'utils/FormValidator';
import { userUpdateMealSettings, userValidate } from 'api';
import { setAppSetting } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import CustomRadio from 'components/common/Forms/CustomRadio';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import '../SettingsChangeMealPlanView.sass';

// Icons
import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

import { steps } from '../steps';

type MetricsStepProps = {
  userGender: string,
  userAge: number,
  userHeight: string,
  userWeight: number,
  userWeightGoal: number,
  localePhrases: any,
  settings: any,
  updateActiveStep: any,
  updateUserMetrics: any,
};

const MetricsStep = ({
  userGender,
  userAge,
  userHeight,
  userWeight,
  userWeightGoal,
  localePhrases,
  settings,
  updateActiveStep,
  updateUserMetrics,
}: MetricsStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const [updateMetrics, setUpdateMetrics] = useState({
    measurement: settings?.measurement,
    gender: null,
    age: null,
    height: null,
    weight: null,
    weight_goal: null,
  });

  useEffect(() => {
    setUpdateMetrics({
      ...updateMetrics,
      gender: userGender,
      age: userAge,
      height: userHeight,
      weight: userWeight,
      weight_goal: userWeightGoal,
    });
    setIsLoadingPage(false);
  }, [
    userGender,
    userAge,
    userHeight,
    userWeight,
    userWeightGoal,
  ]);

  const [updateChangeMealErrors, setUpdateChangeMealErrors] = useState<InputError[]>([]);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      updateMetrics,
      setUpdateMetrics,
      updateChangeMealErrors,
      setUpdateChangeMealErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, updateChangeMealErrors);

  const updateMealSettings = (isShowAlert: boolean) => {
    userUpdateMealSettings(updateMetrics)
      .then(() => {
        if (isShowAlert) {
          toast.success(t('mp.form.success'));
        }
      })
      .catch(() => toast.error(t('mp.form.error')));
  };

  const updateChangeMealSubmit = (e, isShowAlert = false) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements || []].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setUpdateChangeMealErrors([...errors]);

    const {
      measurement,
      height,
      age,
      weight_goal,
      weight,
      gender,
    } = updateMetrics;

    if (!hasError) {
      setIsLoadingButton(true);
      userValidate({
        measurement,
        age,
        height,
        weight,
        weight_goal,
      })
        .then((response) => {
          if (response.data.success) {
            updateActiveStep(steps.notEating);
            updateUserMetrics({
              gender,
              age,
              height,
              weight,
              weight_goal,
            });
            updateMealSettings(isShowAlert);
          }
        })
        .catch((error) => {
          toast.error(t('mp.form.error'));

          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            try {
              const validateErrors = JSON.parse(error.response.data.message);

              const formErrorsTemp: InputError[] = [...updateChangeMealErrors];

              Object.keys(validateErrors).map((field) => {
                formErrorsTemp.push({
                  field,
                  message: validateErrors[field],
                });
              });

              setUpdateChangeMealErrors([...formErrorsTemp]);

              if (
                validateErrors.height ||
                validateErrors.age ||
                validateErrors.weight ||
                validateErrors.weight_goal
              ) {
                updateUserMetrics({
                  gender,
                  age,
                  height,
                  weight,
                  weight_goal,
                });
                updateActiveStep(steps.notEating);
              }
            } catch { }
          }
        })
        .finally(() => setIsLoadingButton(true));
    }
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <div className='change-meal-plan__title'>{t('mp.metrics.title')}</div>
        <div className='change-meal-plan__metrics'>
          <div className='change-meal-plan__metrics-switch'>
            <CustomSwitch
              label1={t('mp.imperial')}
              label2={t('mp.metric')}
              checked={updateMetrics.measurement === 'si'}
              onChange={() => {
                const updatedMeasurement = updateMetrics.measurement === 'si' ? 'us' : 'si';
                setUpdateMetrics({
                  ...updateMetrics,
                  measurement: updatedMeasurement,
                });

                setAppSetting({
                  ...settings,
                  measurement: updatedMeasurement,
                });
              }}
            />
          </div>
          <div className='change-meal-plan__metrics-wrap'>
            <div className='change-meal-plan__metrics-gender'>
              <div className='change-meal-plan__metrics-gender-desc'>
                {t('mp.metrics.sex')}
              </div>
              <div
                className={classnames('change-meal-plan__metrics-gender-item', {
                  active: updateMetrics.gender === 'm',
                })}
              >
                <CustomRadio
                  name='gender'
                  label={(
                    <>
                      <MaleIcon className='change-meal-plan__metrics-gender-item-icon' />
                      <div className='change-meal-plan__metrics-gender-item-text'>
                        {t('mp.form.male')}
                      </div>
                    </>
                  )}
                  value='m'
                  checked={updateMetrics.gender === 'm'}
                  onChange={(e) => setUpdateMetrics({
                    ...updateMetrics,
                    gender: e.target.value,
                  })}
                />
              </div>
              <div
                className={classnames('change-meal-plan__metrics-gender-item', {
                  active: updateMetrics.gender === 'f',
                })}
              >
                <CustomRadio
                  name='gender'
                  label={(
                    <>
                      <FemaleIcon className='change-meal-plan__metrics-gender-item-icon' />
                      <div className='change-meal-plan__metrics-gender-item-text'>
                        {t('mp.form.female')}
                      </div>
                    </>
                  )}
                  value='f'
                  checked={updateMetrics.gender === 'f'}
                  onChange={(e) => setUpdateMetrics({
                    ...updateMetrics,
                    gender: e.target.value,
                  })}
                />
              </div>
            </div>
            <div className='change-meal-plan__metrics-row'>
              <div className='change-meal-plan__metrics-item'>
                <InputField
                  type='number'
                  name='age'
                  errors={getFieldErrors('age')}
                  data-param='16, 100'
                  data-validate='["min-max", "required"]'
                  value={updateMetrics.age}
                  onChange={(e) => validateOnChange('age', e.target.value, e)}
                  min={16}
                  max={100}
                  label={t('mp.metrics.age')}
                />
              </div>
              <div className='change-meal-plan__metrics-item'>
                <InputField
                  name='height'
                  errors={getFieldErrors('height')}
                  data-validate='["required"]'
                  value={updateMetrics.height}
                  onChange={(e) => validateOnChange('height', e.target.value, e)}
                  label={t('mp.metrics.height')}
                />
                <div className='change-meal-plan__metrics-item-unit'>
                  {updateMetrics.measurement === 'si' ? t('common.cm_label') : t('common.ft_label')}
                </div>
              </div>
              <div className='change-meal-plan__metrics-item'>
                <InputField
                  label={t('mp.metrics.weight_now')}
                  type='number'
                  name='weight'
                  step={0.1}
                  data-param='30, 999'
                  data-validate='["min-max", "required"]'
                  errors={getFieldErrors('weight')}
                  value={updateMetrics.weight}
                  onChange={(e) => validateOnChange('weight', e.target.value, e)}
                  min={30}
                  max={999}
                />
                <div className='change-meal-plan__metrics-item-unit'>
                  {updateMetrics.measurement === 'si' ? t('common.kg_label') : t('common.lbs_label')}
                </div>
              </div>
              <div className='change-meal-plan__metrics-item'>
                <InputField
                  label={t('mp.metrics.weight_want')}
                  type='number'
                  name='weight_goal'
                  step={0.1}
                  data-param='30, 999'
                  data-validate='["min-max", "required"]'
                  errors={getFieldErrors('weight_goal')}
                  value={updateMetrics.weight_goal}
                  onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
                  min={30}
                  max={999}
                />
                <div className='change-meal-plan__metrics-item-unit'>
                  {updateMetrics.measurement === 'si' ? t('common.kg_label') : t('common.lbs_label')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            className='change-meal-plan__btn'
            onClick={(e) => updateChangeMealSubmit(e)}
          >
            {t('mp.save_next')}
            <ContentLoading
              isLoading={isLoadingButton}
              isError={false}
              spinSize='sm'
            />
          </Button>
        </div>
      </div>
    </ContentLoading>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}), { setAppSetting })(MetricsStep));
