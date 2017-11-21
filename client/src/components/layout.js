import React from 'react';

export default props => (
  <div>
    <header>
      <h1>Readable</h1>
    </header>
    {props.children}
    <footer>footer</footer>
  </div>
);
