import React, { useState } from 'react';
import classNames from 'classnames';

import './Accordeon.sass';

import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';

type AccordeonItemType = {
  id: number;
  title: JSX.Element | string;
  content: JSX.Element | string;
};

type AccordeonProps = {
  items: AccordeonItemType[];
  className?: string;
};

const AccordeonDefaultProps = {
  className: '',
};

const Accordeon = ({ items, className }: AccordeonProps) => {
  const [activeItem, setActiveItem] = useState<number>(null);
  const [activeItemDimensions, setActiveItemDimensions] = useState({
    maxHeight: null,
  });

  const collapseItem = (e, index) => {
    e.preventDefault();

    let { target } = e;

    while (!target.classList.contains('accordion-item_head')) {
      target = target.parentNode;
    }

    const content = target.nextElementSibling;

    if (index === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
      setActiveItemDimensions({
        maxHeight: `${content.scrollHeight}px`,
      });
    }
  };

  return (
    <div className={classNames('accordion-container', {
      [className]: className,
    })}
    >
      {items.map(({ title, content, id }, index) => (
        <div
          key={id}
          className={classNames('accordion-item', {
            active: activeItem === index,
          })}
        >
          <div
            className='accordion-item_head'
            role='presentation'
            onClick={(e) => collapseItem(e, index)}
          >
            {title}
            <span className='accordion-item_head_icon_item'>
              <AngleRightIcon className='accordion-item_head_icon' />
            </span>
          </div>

          <div
            className='accordion-item_content'
            style={{
              maxHeight: activeItem === index ? activeItemDimensions.maxHeight : null,
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

Accordeon.defaultProps = AccordeonDefaultProps;

export default Accordeon;
