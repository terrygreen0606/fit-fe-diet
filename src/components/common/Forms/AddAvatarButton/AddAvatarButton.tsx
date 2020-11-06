import React from 'react';

import './AddAvatarButton.sass';

import { ReactComponent as UserIcon } from 'assets/img/icons/user-icon.svg';

const AddAvatarButton = () => {
  return (
    <button
      type='button'
      className='update-avatar-button'
    >
      <UserIcon />
      <div className='update-avatar-button-plus' />
    </button>
  );
};

export default AddAvatarButton;
