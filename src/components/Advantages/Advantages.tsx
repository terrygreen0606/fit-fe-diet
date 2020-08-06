import React from "react";

import './Advantages.sass';

const Advantages = (props) => {
  const { FirstIcon, SecondIcon, ThirdIcon } = props;
  return (
    <section className="how-nutrition-plan-works-sect">
      <div className="container">
        <div className="row">
          <div className="how-nutrition-plan-works-col d-flex align-items-center">

            <h4>{props.titleInBlueZone}</h4>

          </div>
          <div className="how-nutrition-plan-works-col">

            <div className="how-nutrition-plan-works-icon-wrap">
              <FirstIcon className="how-nutrition-plan-works-icon" />
            </div>

            <h5 className="mt-4 mb-4">{props.titleForFirstIcon}</h5>
            <p>{props.textForFirstIcon}</p>

          </div>
          <div className="how-nutrition-plan-works-col">

            <div className="how-nutrition-plan-works-icon-wrap">
              <SecondIcon className="how-nutrition-plan-works-icon" />
            </div>

            <h5 className="mt-4 mb-4">{props.titleForSecondIcon}</h5>
            <p>{props.textForSecondIcon}</p>

          </div>
          <div className="how-nutrition-plan-works-col">

            <div className="how-nutrition-plan-works-icon-wrap">
              <ThirdIcon className="how-nutrition-plan-works-icon" />
            </div>

            <h5 className="mt-4 mb-4">{props.titleForThirdIcon}</h5>
            <p>{props.textForThirdIcon}</p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
