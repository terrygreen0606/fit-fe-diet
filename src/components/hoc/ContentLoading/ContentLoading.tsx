import React from 'react';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';
import PageLoader from 'components/common/PageLoader';
import Spinner from 'components/common/Spinner';

import styles from './ContentLoading.module.sass';

type ContentLoadingProps = {
  isLoading: boolean,
  loadingOverlay?: boolean,
  isError: boolean,
  fetchData: (any) => void,
  [propName: string]: any
};

const ContentLoading = (props: ContentLoadingProps) => {

  const {
    isError,
    isLoading,
    fetchData,
    loadingOverlay,
    children
  } = props;

  return isError ? (
    <div className="text-center">
      Ошибка при выполнении запроса <br />

      <Button 
        className="mt-2" 
        size="sm" 
        onClick={fetchData}
      >
        Повторить запрос
      </Button>
    </div>
  ) : (
    <>
      {loadingOverlay ? (
        <div className={classNames(styles.loadingOverlay, {
          [styles.loadingOverlay_is_loading]: isLoading
        })}>
          <Spinner className={styles.loadingSpinner} width={36} height={36} color="#00C5D1" />
          {children}
        </div>
      ) : (
        <>
          {isLoading ? <div className="text-center"><Spinner width={25} height={25} color="#00C5D1" /></div> : children}
        </>
      )}
    </>
  );
};

export default ContentLoading;
