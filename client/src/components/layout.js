import React from 'react';
import { Container, Menu, Image } from 'semantic-ui-react';

const menuStyle = {
  height: '3.4rem',
};

const imageStyle = {
  width: '40px',
  marginRight: '1rem',
};

const logoStyle = {
  fontSize: '1.2rem',
  fontWeight: '500',
  fontFamily: 'verdana',
  border: 'none',
};

const contentStyle = {
  marginTop: '6rem',
};

export default props => (
  <div>
    <Menu fixed="top" style={menuStyle}>
      <Container>
        <Menu.Item style={logoStyle}>
          <Image size="mini" src="/readable-logo.svg" style={imageStyle} />
          readable
        </Menu.Item>
        <Menu.Item as="a">All</Menu.Item>
        <Menu.Item as="a">React</Menu.Item>
        <Menu.Item as="a">Redux</Menu.Item>
        <Menu.Item as="a">Udacity</Menu.Item>
      </Container>
    </Menu>
    <Container style={contentStyle}>{props.children}</Container>
  </div>
);
