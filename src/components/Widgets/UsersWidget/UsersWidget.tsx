import React from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './UsersWidget.sass';

// Icons
import { ReactComponent as UsersIcon } from 'assets/img/icons/three-users-icon.svg';

type UsersWidgetProps = {
  count: number;
  localePhrases: any;
  active?: boolean;
};

const UsersWidgetDefaultProps = {
  active: true,
};

const UsersWidget = ({
  count,
  localePhrases,
  active,
}: UsersWidgetProps) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  return (
    <div className={classNames('users-widget', {
      active,
    })}
    >
      <div className='users-widget__icon'>
        <UsersIcon />
      </div>
      <div className='users-widget__desc'>
        <div className='users-widget__desc-count'>
          {count}
        </div>
        <div className='users-widget__desc-text'>
          {t('checkout.active_users')}
        </div>
      </div>
    </div>
  );
};

UsersWidget.defaultProps = UsersWidgetDefaultProps;

export default WithTranslate(UsersWidget);
