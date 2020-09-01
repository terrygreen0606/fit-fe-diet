import React from 'react';
import classnames from 'classnames';

import Button from 'components/common/Forms/Button';

export type StepProps = {
  visible: boolean,
  slide: number,
  title: string,
  text?: string,
  image: string,
  btn_text: string,
  onClick: (any) => void,
};

const Step = ({
  visible,
  slide,
  title,
  text,
  image,
  btn_text,
  onClick,
}: StepProps) => (
  <div
    className={classnames(`col quick_tour_col quick_tour_col_${slide}`, {
      visible,
    })}
    style={{ backgroundImage: `url(${image})` }}
  >
    <h2 className='quick_tour_title' dangerouslySetInnerHTML={{ __html: title }} />

    { text && <p className='quick_tour_text' dangerouslySetInnerHTML={{ __html: text }} /> }

    <Button
      type='button'
      onClick={onClick}
      color='primary'
      className={classnames('quick_tour_button', {
        slide_4: slide === 4,
      })}
    >
      {btn_text}
    </Button>
  </div>
);

export default Step;
