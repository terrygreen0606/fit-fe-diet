import React from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import '../SalesWidgets.sass';

// Icons
import { ReactComponent as UsersIcon } from 'assets/img/icons/three-users-icon.svg';

type UserCountWidgetProps = {
  count: number;
  localePhrases: any;
  active?: boolean;
};

const UserCountWidgetDefaultProps = {
  active: true,
};

const UserCountWidget = ({
  count,
  localePhrases,
  active,
}: UserCountWidgetProps) => {
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

UserCountWidget.defaultProps = UserCountWidgetDefaultProps;

export default WithTranslate(UserCountWidget);
