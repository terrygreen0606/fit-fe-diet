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
import UsersWidgetsReviews from './UsersWidgetsReviews';
import UsersWidgetsCount from './UsersWidgetsCount';

import './UsersWidgets.sass';

const UsersWidgets = (props: any) => {
  const t = (code: string) =>
    getTranslate(props.localePhrases, code);

  const [isUsersWidgetActive, setIsUsersWidgetActive] = useState<boolean>(false);
  const [usersCount, setUsersCount] = useState<number>(null);

  const [isReviewsWidgetActive, setIsReviewsWidgetActive] = useState<boolean>(false);
  const [isReviewsWidgetHide, setIsReviewsWidgetHide] = useState<boolean>(false);
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

  const getRecallsInfo = () => {
    getRecallsData().then((response) => {
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

        setIsUsersWidgetActive(true);
        setIsReviewsWidgetActive(true);
      } else {
        toast.error(t('common.error'));
      }
    });
  };

  const reviewCount = useRef(1);

  useInterval(() => {
    setIsReviewsWidgetHide(true);
    setReviewActive({
      ...reviewActive,
      image: reviewsList[reviewCount.current]?.image,
      name: reviewsList[reviewCount.current]?.name,
      text: reviewsList[reviewCount.current]?.text,
    });

    if (reviewsList.length === 0) {
      reviewCount.current = 1;
    } else {
      reviewCount.current += 1;
    }

    if (reviewCount.current === reviewsList.length) {
      reviewCount.current = 0;
    }
    setTimeout(() => {
      setIsReviewsWidgetHide(false);
    }, 200);
  }, 2000);

  useEffect(() => {
    setTimeout(() => {
      getRecallsInfo();
    }, 3000);
  }, []);

  return (
    <div className='widgets'>
      <UsersWidgetsReviews
        active={isUsersWidgetActive}
        count={usersCount}
      />
      <UsersWidgetsCount
        active={isReviewsWidgetActive}
        fadeAnimation={isReviewsWidgetHide}
        image={reviewActive.image}
        name={reviewActive.name}
        text={reviewActive.text}
      />
    </div>
  );
};

export default WithTranslate(UsersWidgets);
