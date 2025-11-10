import React from 'react';

export const SketchFilters = () => {
  return (
    <svg className="sketch-filters" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Rough edge filter */}
        <filter id="sketch-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Hand-drawn line filter */}
        <filter id="hand-drawn">
          <feTurbulence
            baseFrequency="0.03"
            numOctaves="2"
            result="turbulence"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>

        {/* Pencil texture */}
        <filter id="pencil-texture">
          <feTurbulence
            baseFrequency="1.5"
            numOctaves="4"
            result="noise"
            seed="3"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="white"
            surfaceScale="1"
            result="light"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="light" operator="multiply" />
        </filter>
      </defs>
    </svg>
  );
};
