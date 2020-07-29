import React from 'react';
import './InputFile.sass';

type InputFileProps = {
  text?: string,
}

const InputFile = ({ text = 'Add photo' }: InputFileProps) => {
  return (
    <label className="input-file-label">
      <input type="file" className="input-file-label__input" />
      <span className="input-file-label__text">{text}</span>
    </label>
  );
}

export default InputFile;
