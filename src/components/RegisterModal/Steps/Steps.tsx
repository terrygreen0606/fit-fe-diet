import React from 'react';
import classNames from 'classnames';

import styles from './Steps.module.sass';

const Steps = (props: any) => {
  return (
    <div className={classNames(styles.registerModal_steps_wrap, {
      [styles[`registerModal_steps_wrap_step1`]]: props.step === 'GOAL',
      [styles[`registerModal_steps_wrap_step2`]]: props.step === 'INFO',
      [styles[`registerModal_steps_wrap_step3`]]: props.step === 'JOIN',
    })}>
      <div className={classNames(styles.registerModal_step, {
        [styles.registerModal_step_active]: props.step === 'GOAL'
      })}>
        <h5 className={styles.registerModal_step_label}>Choose a goal</h5>
        <span className={styles.registerModal_step_mark}></span>
      </div>

      <div className={classNames(styles.registerModal_step, {
        [styles.registerModal_step_active]: props.step === 'INFO'
      })}>
        <h5 className={styles.registerModal_step_label}>Add info</h5>
        <span className={styles.registerModal_step_mark}></span>
      </div>

      <div className={classNames(styles.registerModal_step, {
        [styles.registerModal_step_active]: props.step === 'JOIN'
      })}>
        <h5 className={styles.registerModal_step_label}>Join</h5>
        <span className={styles.registerModal_step_mark}></span>
      </div>
    </div>
  );
};

export default Steps
