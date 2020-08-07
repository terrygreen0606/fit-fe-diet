import React, { FunctionComponent, SVGProps } from "react";

import './Advantages.sass';

type AdvantagesProps = {
  icon1: FunctionComponent<SVGProps<SVGSVGElement>>,
  icon2: FunctionComponent<SVGProps<SVGSVGElement>>,
  icon3: FunctionComponent<SVGProps<SVGSVGElement>>,
  mainTitle: string,
  advantage1Title: string,
  advantage1Desc: string,
  advantage2Title: string,
  advantage2Desc: string,
  advantage3Title: string,
  advantage3Desc: string,
};

const Advantages = (props: AdvantagesProps) => {
  const Icon1 = props.icon1;
  const Icon2 = props.icon2;
  const Icon3 = props.icon2;

  return (
    <section className="how-exercise-plan-works-sect">
      <div className="container">
        <div className="row">
          <div className="how-exercise-plan-works-col d-flex align-items-center">

            <h4>{props.mainTitle}</h4>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <Icon1 className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.advantage1Title}</h5>
              <p>{props.advantage1Desc}</p>
            </div>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <Icon2 className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.advantage2Title}</h5>
              <p>{props.advantage2Desc}</p>
            </div>

          </div>
          <div className="how-exercise-plan-works-col">

            <div className="how-exercise-plan-works-icon-wrap">
              <Icon3 className="how-exercise-plan-works-icon" />
            </div>

            <div className="how-exercise-plan-works-text">
              <h5 className="mt-4 mb-4">{props.advantage3Title}</h5>
              <p>{props.advantage3Desc}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
