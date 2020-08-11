import React from 'react';

type MapProps = {
  weight: string;
  height: string;
  place: string;
};

const Map = ({ weight, height, place }: MapProps) => (
  <iframe
    title={place}
    src={`https://maps.google.com/maps?q=${place}&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;&output=embed`}
    width={weight}
    height={height}
    aria-hidden="false"
    style={{ border: 0 }}
  />
);

export default Map;
