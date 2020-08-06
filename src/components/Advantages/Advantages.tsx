import React, { FunctionComponent, SVGProps } from "react";

import './Advantages.sass';

type AdvantagesProps = {
  FirstIcon: FunctionComponent<SVGProps<SVGSVGElement>>,
  SecondIcon: FunctionComponent<SVGProps<SVGSVGElement>>,
  ThirdIcon: FunctionComponent<SVGProps<SVGSVGElement>>,
  titleInBlueZone: string,
  titleForFirstIcon: string,
  textForFirstIcon: string,
  titleForSecondIcon: string,
  textForSecondIcon: string,
  titleForThirdIcon: string,
  textForThirdIcon: string,
};

const Advantages = (props: AdvantagesProps) => {
  const { FirstIcon, SecondIcon, ThirdIcon } = props;
  return (
    <section className="how-exercise-plan-works-sect">
      <div className="container">
        <div className="row">
          <div className="how-exercise-plan-works-col d-flex align-items-center">

            <h4>{props.titleInBlueZone}</h4>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <FirstIcon className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.titleForFirstIcon}</h5>
              <p>{props.textForFirstIcon}</p>
            </div>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <SecondIcon className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.titleForSecondIcon}</h5>
              <p>{props.textForSecondIcon}</p>
            </div>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <ThirdIcon className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.titleForThirdIcon}</h5>
              <p>{props.textForThirdIcon}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
