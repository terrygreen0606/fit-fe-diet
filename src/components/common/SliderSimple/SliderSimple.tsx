import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import uuid from 'react-uuid';

import './SliderSimple.sass';

type SliderSimpleProps = {
  slides: JSX.Element[];
  nav?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
};

const ANIMATE_TIME = 400;

const SliderSimple = ({ slides, nav, dots, autoplay, autoplaySpeed, className }: SliderSimpleProps) => {

  const [slidesList, setSlidesList] = useState<any[]>(slides.map(slide => ({
    id: uuid(),
    item: slide
  })));
  
  const [slidesMove, setSlidesMove] = useState<boolean>(false);
  const [slidesNum, setSlidesNum] = useState<number>(0);
  
  const [sliderRef] = useState(React.createRef<HTMLDivElement>());
    
  const [sliderDimensions, setSliderDimensions] = useState<any>({
    containerWidth: null,
    listWidth: null,
    itemWidth: null,
    marginLeft: null,
    left: 0
  });

  const [sliderContainerWidth, setSliderContainerWidth] = useState<number>(null);
  const [sliderWidth, setSliderWidth] = useState<number>(null);
  const [sliderItemWidth, setSliderItemWidth] = useState<number>(null);
  const [sliderMarginLeft, setSliderMarginLeft] = useState<number>(null);
  const [sliderLeft, setSliderLeft] = useState<number>(null);

  useEffect(() => {
    const slideCount = slides.length;
    const sliderItem: HTMLElement = sliderRef.current.querySelector('.slider-simple-item');
    let sliderContainerWidth = null;

    if (sliderItem) {
      sliderContainerWidth = sliderRef.current.offsetWidth + 1;
    }

    const sliderUlWidth = slideCount * sliderContainerWidth;
    
    setSliderDimensions({
      ...sliderDimensions,
      containerWidth: sliderContainerWidth,
      listWidth: sliderUlWidth,
      itemWidth: sliderContainerWidth,
      marginLeft: -sliderContainerWidth
    });
  }, []);

  const moveSlideLeft = () => {
    if (slidesNum === 0) {
      setSlidesNum(slides.length - 1);
    } else {
      setSlidesNum(slidesNum - 1);
    }

    setSlidesMove(true);
    setSliderDimensions({
      ...sliderDimensions,
      left: +sliderDimensions.itemWidth
    });

    setTimeout(() => {
      setSlidesMove(false);

      let slidesListTemp = [...slidesList];
      slidesListTemp.unshift(slidesListTemp.pop());
      setSlidesList([...slidesListTemp]);

      setSliderDimensions({
        ...sliderDimensions,
        left: 0
      });
    }, ANIMATE_TIME);
  };
  
  const moveSlideRight = () => {
    if (slidesNum === slides.length - 1) {
      setSlidesNum(0);
    } else {
      setSlidesNum(slidesNum + 1);
    }

    setSlidesMove(true);
    setSliderDimensions({
      ...sliderDimensions,
      left: -sliderDimensions.itemWidth
    });

    setTimeout(() => {
      setSlidesMove(false);

      let slidesListTemp = [...slidesList];
      slidesListTemp.push(slidesListTemp.shift());
      setSlidesList([...slidesListTemp]);

      setSliderDimensions({
        ...sliderDimensions,
        left: 0
      });
    }, ANIMATE_TIME);
  };

  useEffect(() => {
    let timer = null;

    if (autoplay) {
      timer = setInterval(() => {
        moveSlideRight();
      }, autoplaySpeed || 2000);
    }

    return () => {
      if (autoplay) {
        clearInterval(timer);
      }
    };
  });

  return (
    <div className={classNames("slider-simple-wrap", {
      'has-dots': dots
    })}>
      <div ref={sliderRef} className={classNames("slider-simple-container", {
        [className]: className
      })}>
        {nav && (
          <>
            <span className="slider-simple-next" onClick={e => moveSlideRight()} />
            <span className="slider-simple-prev" onClick={e => moveSlideLeft()} />
          </>
        )}
        
        <div 
          className={classNames("slider-simple-list", {
            'slides-move': slidesMove
          })}
          style={{ 
            width: sliderDimensions.listWidth, 
            marginLeft: sliderDimensions.marginLeft, 
            left: sliderDimensions.left 
          }}
        >
          {slidesList.map(({ id, item }) => (
            <div key={id} className="slider-simple-item" style={{ width: sliderDimensions.itemWidth }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {dots && (
        <div className="slider-simple-dots">
          {slidesList.map(({ id }, index) => (
            <span key={id} className={classNames("slider-simple-dot", {
              'active': index === slidesNum
            })}></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderSimple;
