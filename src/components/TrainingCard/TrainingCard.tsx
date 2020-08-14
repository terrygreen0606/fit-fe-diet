import React from 'react';

import './TrainingCard.sass';

type TrainingCardProps = {
  image: string,
  text: string,
  time: number,
};

const TrainingCard = ({ image, text, time }: TrainingCardProps) => (
  <div className='training-card'>
    <div
      className='training-card-image'
      style={{ backgroundImage: `url(${image})` }}
    />

    <div className='training-card-description'>
      {text}
    </div>

    <div className='training-card-bottom'>
      <span className='training-card-time'>
        {time}
      </span>
    </div>
  </div>
);

export default TrainingCard;
