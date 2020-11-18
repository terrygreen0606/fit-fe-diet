import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { getRecallsData } from 'api';

// Components
import useInterval from 'components/hooks/useInterval';
import WithTranslate from 'components/hoc/WithTranslate';
import ReviewsWidget from './ReviewsWidget';
import UserCountWidget from './UserCountWidget';

import './SalesWidgets.sass';

type SalesWidgetsProps = {
  isShow?: boolean;
  localePhrases: any;
};

const SalesWidgetsDefaultProps = {
  isShow: true,
};

const SalesWidgets = ({
  isShow,
  localePhrases,
}: SalesWidgetsProps) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  const [isUsersWidgetActive, setIsUsersWidgetActive] = useState<boolean>(false);
  const [usersCount, setUsersCount] = useState<number>(null);

  const [isReviewsWidgetActive, setIsReviewsWidgetActive] = useState<boolean>(false);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [reviewActive, setReviewActive] = useState<{
    image: string,
    name: string,
    text: string,
  }>({
    image: null,
    name: null,
    text: null,
  });
  const [isActiveInterval, setIsActiveInterval] = useState<boolean>(false);
  const [isShowWidgets, setIsShowWidgets] = useState<boolean>(false);

  const getRecallsInfo = () => {
    getRecallsData()
      .then((response) => {
        if (response.data.data && response.data.success) {
          const { data } = response.data;

          setUsersCount(data.active_users);
          setReviewsList([...data.recalls]);

          setReviewActive({
            ...reviewActive,
            image: data.recalls[0].image,
            name: data.recalls[0].name,
            text: data.recalls[0].text,
          });

          setIsActiveInterval(true);
          setIsUsersWidgetActive(true);
        } else {
          toast.error(t('common.error'));
        }
      })
      .catch(() => toast.error(t('common.error')));
  };

  const reviewCount = useRef(0);

  useInterval(() => {
    const prevActiveWidget = isUsersWidgetActive ? 'users' : 'reviews';

    setIsUsersWidgetActive(false);
    setIsReviewsWidgetActive(false);
    setIsActiveInterval(false);

    setTimeout(() => {
      setIsActiveInterval(true);
      if (prevActiveWidget === 'users') {
        setReviewActive({
          ...reviewActive,
          image: reviewsList[reviewCount.current]?.image,
          name: reviewsList[reviewCount.current]?.name,
          text: reviewsList[reviewCount.current]?.text,
        });

        if (reviewsList.length === 0) {
          reviewCount.current = 0;
        } else {
          reviewCount.current += 1;
        }

        if (reviewCount.current === reviewsList.length) {
          reviewCount.current = 0;
        }

        setIsReviewsWidgetActive(true);
      } else {
        setUsersCount(usersCount > 3600 ? usersCount - 100 : usersCount + 100);
        setIsUsersWidgetActive(true);
      }
    }, 4000);
  }, isActiveInterval && isShowWidgets ? 8000 : null);

  useEffect(() => {
    let cleanComponent = false;

    if (!cleanComponent) {
      setTimeout(() => {
        getRecallsInfo();
      }, 15000);
    }

    return () => cleanComponent = true;
  }, []);

  useEffect(() => {
    let cleanComponent = false;

    if (isShow && !cleanComponent) setIsShowWidgets(true);

    return () => cleanComponent = true;
  }, [isShow]);

  return (
    <div className='widgets'>
      <UserCountWidget
        active={isUsersWidgetActive && isShowWidgets}
        count={usersCount}
      />
      <ReviewsWidget
        active={isReviewsWidgetActive && isShowWidgets}
        data={reviewActive}
      />
    </div>
  );
};

SalesWidgets.defaultProps = SalesWidgetsDefaultProps;

export default WithTranslate(SalesWidgets);
