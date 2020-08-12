import React from 'react';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';
import PageLoader from 'components/common/PageLoader';
import Spinner from 'components/common/Spinner';

import './ContentLoading.sass';

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
      Error when loading <br />

      <Button 
        className="mt-2" 
        size="sm" 
        onClick={fetchData}
      >
        Retry
      </Button>
    </div>
  ) : (
    <>
      {loadingOverlay ? (
        <div className={classNames("loadingOverlay", {
          "loadingOverlay_is_loading": isLoading
        })}>
          <Spinner className="loadingSpinner" width={36} height={36} color="#00C5D1" />
          {children}
        </div>
      ) : (
        <>
          {isLoading ? <div className="loadingSpinner_wrap"><Spinner width={25} height={25} color="#00C5D1" /></div> : children}
        </>
      )}
    </>
  );
};

export default ContentLoading;
