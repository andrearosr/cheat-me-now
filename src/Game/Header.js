import React, { useState, useEffect } from 'react';

function Header({ title, color }) {
  const maxWidth = 1439;
  const [width, setWidth] = useState(Math.min(maxWidth, window.innerWidth));
  const updateSize = () => setWidth(Math.min(maxWidth, window.innerWidth));
  useEffect(() => (window.onresize = updateSize), []);
  
  const height = Math.max(100, width * 117 / maxWidth);

  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <svg
        width={width}
        height={height}
        viewBox="0 0 1439 117"
        xmlns="http://www.w3.org/2000/svg"
        className="header__background"
      >
        <path
          d="M0 0h1439v99.145c0 10.896-40.793 19.247-86.25 17.661-201-7.006-724.702-20.997-1265.196-.304C41.904 118.25.486 109.877.447 98.89L0 0z"
          fill={color}
          fillRule="nonzero"
        />
      </svg>
    </div>
  );
}

export default Header;