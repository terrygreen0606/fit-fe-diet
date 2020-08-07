import React from 'react';

import './TrainingCard.sass';

type TrainingCardProps = {
  image: string,
  text: string,
  time: number,
};

const TrainingCard = ({ image, text, time }: TrainingCardProps) => {
  return  (
    <div className="training-card">
      <div
        className="training-card-image"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="training-card-description">
        {text}
      </div>

      <div className="training-card-bottom">
        <span className="training-card-time">
          {time} minutit
        </span>
      </div>
    </div>
  )
};

export default TrainingCard;
