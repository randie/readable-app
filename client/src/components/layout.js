import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';

const logoStyle = {
  color: '#666',
  fontSize: '1.6rem',
  fontFamily: 'verdana',
  marginTop: '2rem',
  marginBottom: '2rem',
};

const imageStyle = {
  width: '40px',
  display: 'inline-block',
  marginRight: '0.5rem',
  marginTop: '-5px',
};

export default props => (
  <div>
    <Container style={logoStyle}>
      <Link to="/">
        <Image size="mini" src="/readable-logo.svg" style={imageStyle} />
        <span>readable</span>
      </Link>
    </Container>
    <Container>{props.children}</Container>
  </div>
);
