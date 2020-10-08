import React from 'react';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';

import './ContentLoading.sass';

type ContentLoadingProps = {
  isLoading: boolean;
  loadingOverlay?: boolean;
  spinSize?: 'xs' | 'sm' | 'md' | 'lg';
  isError: boolean;
  fetchData?: (any) => void;
  [propName: string]: any;
  label?: string,
  color?: string,
};

const ContentLoadingDefaultProps = {
  spinSize: 'sm',
  label: '',
  color: '#00C5D1',
};

const ContentLoading = (props: ContentLoadingProps) => {
  const {
    isError,
    isLoading,
    fetchData,
    spinSize,
    loadingOverlay,
    label,
    color,
    children,
  } = props;

  return isError ? (
    <div className='text-center'>
      Error when loading <br />
      <Button className='mt-2' size='sm' onClick={fetchData}>
        Retry
      </Button>
    </div>
  ) : (
      <>
        {loadingOverlay ? (
          <div
            className={classNames('loadingOverlay', {
              loadingOverlay_is_loading: isLoading,
            })}
          >
            <Spinner className='loadingSpinner' size={spinSize} color={color} />
            {children}
          </div>
        ) : (
            <>
              {isLoading ? (
                <div className='loadingSpinner_wrap'>
                  <Spinner size={spinSize} color={color} />
                  {label && (
                    <p>
                      {label}
                    </p>
                  )}
                </div>
              ) : (
                  children
                )}
            </>
          )}
      </>
    );
};

ContentLoading.defaultProps = ContentLoadingDefaultProps;

export default ContentLoading;
