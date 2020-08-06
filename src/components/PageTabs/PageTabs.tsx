import React from "react";


import "./PageTabs.sass";


type PageTabsProps = {
  levels: Array<string>,
  defaultChecked: string,
  setLevel: React.Dispatch<React.SetStateAction<string>>,
};

const PageTabs = ({ levels, defaultChecked, setLevel }: PageTabsProps) => {

  return (
    <div className="col-12 page-tabs-layout">
      {
        levels.map(item => (
          <React.Fragment key={item}>
            <input
              type="radio"
              id={item}
              value={item}
              name="tabs"
              defaultChecked={item === defaultChecked}
              onChange={e => setLevel(e.target.value)}
            />
            <label htmlFor={item} className="page-tabs-item">
              <h3 className="page-tabs-item-text">
                {item}
              </h3>
            </label>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default PageTabs;
