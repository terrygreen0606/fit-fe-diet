import React from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import '../Widgets.sass';

// Icons
import { ReactComponent as UsersIcon } from 'assets/img/icons/three-users-icon.svg';

type WidgetsUserCountProps = {
  count: number;
  localePhrases: any;
  active?: boolean;
};

const WidgetsUserCountDefaultProps = {
  active: true,
};

const WidgetsUserCount = ({
  count,
  localePhrases,
  active,
}: WidgetsUserCountProps) => {
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

WidgetsUserCount.defaultProps = WidgetsUserCountDefaultProps;

export default WithTranslate(WidgetsUserCount);
