import React from 'react';

export default props => (
  <div className="container">
    <header>readable</header>
    <div className="content">{props.children}</div>
    <footer>footer</footer>
  </div>
);
