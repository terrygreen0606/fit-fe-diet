import React, { useRef } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';
import uuid from 'react-uuid';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './CountDown.sass';

type CountDownProps = {
  seconds: number;
  className?: string;
  localePhrases: any;
};

const CountDown = ({ seconds, localePhrases, className }: CountDownProps) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(localePhrases, code, placeholders);

  const getTimeLabel = (label: string) => {
    let timeLabel = '';

    switch (label) {
      case 'Days':
        timeLabel = t('common.days_label');
        break;

      case 'Hours':
        timeLabel = t('common.hours_label');
        break;

      case 'Minutes':
        timeLabel = t('common.minutes_label');
        break;

      case 'Seconds':
        timeLabel = t('common.seconds_label');
        break;
    }

    return timeLabel;
  };

  function CountdownTracker (label, value) {
    let isFlip = false;

    const elRef = React.createRef<HTMLDivElement>();
    const id = uuid();

    let flipClockPiece = (
      <span key={id} ref={elRef} className="flip-clock__piece">
        <b className="flip-clock__card">
          <b className="flip-clock__card__top"></b>
          <b className="flip-clock__card__bottom"></b>
          <b className="flip-clock__card__back"><b className="flip-clock__card__bottom"></b></b>
        </b> 
        <span className="flip-clock__slot">{getTimeLabel(label)}</span>
      </span>
    );

    this.el = flipClockPiece;

    this.update = function(val){
      val = ( '0' + val ).slice(-2);
      if ( val !== this.currentValue ) {
        
        if ( elRef.current ) {
          if (this.currentValue >= 0) {
            elRef.current.querySelector('.flip-clock__card__back').setAttribute('data-value', this.currentValue);
            elRef.current.querySelector('.flip-clock__card__bottom').setAttribute('data-value', this.currentValue);
          }
  
          this.currentValue = val;

          elRef.current.querySelector('.flip-clock__card__top').innerHTML = this.currentValue;
          elRef.current.querySelector('.flip-clock__card__back .flip-clock__card__bottom').setAttribute('data-value', this.currentValue);

          elRef.current.classList.remove('flip');
          void elRef.current.offsetWidth;
          elRef.current.classList.add('flip');
        }
      }
    }
    
    this.update(value);
  };

  const getTimeRemaining = endtime => {
    var t = Date.parse(endtime) - Date.parse(new Date().toISOString());

    return {
      'Total': t,
      'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
      'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
      'Minutes': Math.floor((t / 1000 / 60) % 60),
      'Seconds': Math.floor((t / 1000) % 60)
    };
  };

  const getTime = () => {
    var t = new Date();

    return {
      'Total': t,
      'Hours': t.getHours() % 12,
      'Minutes': t.getMinutes(),
      'Seconds': t.getSeconds()
    };
  };

  const Clock = (countdown, callback?) => {
    countdown = countdown ? new Date(Date.parse(countdown)) : false;
    callback = callback || function(){};
    
    var updateFn = countdown ? getTimeRemaining : getTime;

    let flipClockPieceList = [];

    var trackers = {},
        t = updateFn(countdown),
        key, timeinterval;

    for ( key in t ){
      if ( key === 'Total' || t[key] === 0 ) { continue; }
      trackers[key] = new CountdownTracker(key, t[key]);
      flipClockPieceList.push(trackers[key].el);
    }

    var i = 0;
    const updateClock = () => {
      timeinterval = requestAnimationFrame(updateClock);
      
      // throttle so it's not constantly updating the time.
      if ( i++ % 10 ) { return; }
      
      var t = updateFn(countdown);
      if ( t.Total < 0 ) {
        cancelAnimationFrame(timeinterval);
        for ( key in trackers ){
          trackers[key].update( 0 );
        }
        callback();
        return;
      }
      
      for ( key in trackers ){
        trackers[key].update( t[key] );
      }
    };

    setTimeout(updateClock,500);

    return (
      <div className={classNames("flip-clock", {
        [className]: className
      })}>
        {flipClockPieceList.map(piece => piece)}
      </div>
    );
  };

  return Clock(new Date(Date.parse(new Date().toISOString()) + seconds * 1000))
};

export default WithTranslate(CountDown);
