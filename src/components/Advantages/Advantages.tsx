import React, { FunctionComponent, SVGProps } from 'react';

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

const Advantages = ({
  icon1,
  icon2,
  icon3,
  mainTitle,
  advantage1Desc,
  advantage1Title,
  advantage2Desc,
  advantage2Title,
  advantage3Desc,
  advantage3Title,
}: AdvantagesProps) => {
  const Icon1 = icon1;
  const Icon2 = icon2;
  const Icon3 = icon3;

  return (
    <section className="how-exercise-plan-works-sect">
      <div className="container">
        <div className="row">
          <div className="col-12 px-md-4 d-md-flex justify-content-between">
            <div className="how-exercise-plan-works-col d-flex align-items-center">

              <h4>{mainTitle}</h4>

            </div>
            <div className="how-exercise-plan-works-col">

              <div className="how-exercise-plan-works-icon-wrap">
                <Icon1 className="how-exercise-plan-works-icon" />
              </div>

              <div className="how-exercise-plan-works-text">
                <h5 className="mt-4 mb-4">{advantage1Title}</h5>
                <p>{advantage1Desc}</p>
              </div>

            </div>
            <div className="how-exercise-plan-works-col">

              <div className="how-exercise-plan-works-icon-wrap">
                <Icon2 className="how-exercise-plan-works-icon" />
              </div>

              <div className="how-exercise-plan-works-text">
                <h5 className="mt-4 mb-4">{advantage2Title}</h5>
                <p>{advantage2Desc}</p>
              </div>

            </div>
            <div className="how-exercise-plan-works-col">

              <div className="how-exercise-plan-works-icon-wrap">
                <Icon3 className="how-exercise-plan-works-icon" />
              </div>

              <div className="how-exercise-plan-works-text">
                <h5 className="mt-4 mb-4">{advantage3Title}</h5>
                <p>{advantage3Desc}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
