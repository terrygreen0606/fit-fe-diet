import React, { useState } from 'react';

// Components
import Button from 'components/common/Forms/Button';

import styles from '../RegisterModal.module.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/img/icons/arrow-right-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';
import { ReactComponent as MilkIcon } from 'assets/img/icons/milk-icon.svg';
import { ReactComponent as MeatIcon } from 'assets/img/icons/meat-icon.svg';
import { ReactComponent as FishIcon } from 'assets/img/icons/fish-icon.svg';
import { ReactComponent as CookIcon } from 'assets/img/icons/cook-icon.svg';
import { ReactComponent as BreadIcon } from 'assets/img/icons/bread-icon.svg';
import { ReactComponent as CakeIcon } from 'assets/img/icons/cake-icon.svg';

const GoalStep = (props: any) => {

  const [registerGoal, setRegisterGoal] = useState('LIFT');

  return (
    <div className={styles.register_goal}>
      <h6 className={`${styles.register_title} mb-4`}>We will help you achieve the chosen goal</h6>

      <div className={styles.register_goals_list}>
        <Button 
          className={styles.register_goal_btn} 
          color="primary" 
          block
          onClick={e => setRegisterGoal('LOSE')}
          outline={registerGoal !== 'LOSE'}
        >
          <span>
            <LoseIcon className={styles.register_goal_icon} />
            Lose weight
          </span>
          <ArrowRightIcon />
        </Button>

        <Button 
          className={styles.register_goal_btn} 
          color="primary" 
          block
          onClick={e => setRegisterGoal('KEEP')}
          outline={registerGoal !== 'KEEP'}
        >
          <span>
            <KeepIcon className={styles.register_goal_icon} />
            Keep the weight
          </span>
          <ArrowRightIcon />
        </Button>

        <Button 
          className={styles.register_goal_btn} 
          color="primary" 
          block
          onClick={e => setRegisterGoal('LIFT')}
          outline={registerGoal !== 'LIFT'}
        >
          <span>
            <LiftIcon className={styles.register_goal_icon} />
            Lift the weight
          </span>
          <ArrowRightIcon />
        </Button>
      </div>

      <h6 className={`${styles.register_goal_title} mt-5 mb-3`}>I'm not eating:</h6>

      <div className={styles.register_eating_list}>
        <div className={styles.register_eating_item}>
          <span>
            <MilkIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Milk</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>

        <div className={styles.register_eating_item}>
          <span>
            <MeatIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Meat</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>

        <div className={styles.register_eating_item}>
          <span>
            <FishIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Fish</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>

        <div className={styles.register_eating_item}>
          <span>
            <CookIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Chronic diseases</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>

        <div className={styles.register_eating_item}>
          <span>
            <BreadIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Gluten</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>

        <div className={styles.register_eating_item}>
          <span>
            <CakeIcon className={styles.register_eating_item_icon} />
            <span className={styles.register_eating_item_label}>Deabetes</span>
          </span>
          <CrossIcon className={styles.register_eating_item_cross} />
        </div>
      </div>

      <div className="text-center">
        <Button 
          className="mt-3" 
          style={{ width: '220px' }} 
          color="primary" 
          onClick={() => props.setRegisterStep('INFO')}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
