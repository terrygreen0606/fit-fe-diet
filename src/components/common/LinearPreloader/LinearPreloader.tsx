import React from 'react';

import './LinearPreloader.sass';

const LinearPreloader = () => {
  return (
    <div className="linearProgress">
      <div className="linearProgress_bar linearProgress_bar1"></div>
      <div className="linearProgress_bar linearProgress_bar2"></div>
    </div>
  );
};

export default LinearPreloader;
