import React from 'react';

export default ({ title, color }) => {
  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <svg
        width={1439}
        height={117}
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
};