import React from 'react';

type HintStepType = {
  hintStep: number,
  onClick: (any) => void,
  text: string,
  closeText: string,
};

const HintStep = ({
  hintStep,
  onClick,
  text,
  closeText,
}: HintStepType) => (
  <div className={`hint_sect hint_sect_${hintStep}`}>
    <p className='hint_text'>
      {text}
    </p>
    <span role='presentation' className='hint_close' onClick={onClick}>
      {closeText}
    </span>
    <span className={`hint_triangle hint_sect_${hintStep}_triangle`} />
  </div>
);

export default HintStep;
