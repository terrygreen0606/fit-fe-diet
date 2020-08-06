import React from "react";

import CustomRadio from "../../components/common/Forms/CustomRadio";

import "./PageTabs.sass";


const PageTabs = ({ levels, defaultChecked, setLevel }) => {

  return (
    <div className="page-tabs-layout">
      {
        levels.map(item => (
          <CustomRadio
            key={item}
            className="page-tabs-item"
            name="level"
            label={item}
            value={item}
            defaultChecked={item === defaultChecked}
            inline
            onChange={e => setLevel(e.target.value)}
          />
        ))
      }
    </div>
  )
}

export default PageTabs;
