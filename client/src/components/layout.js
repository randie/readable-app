import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Menu, Image } from 'semantic-ui-react';
import { fetchCategories } from '../actions';

const menuStyle = {
  height: '3.4rem',
};

const imageStyle = {
  width: '40px',
  marginRight: '0.5rem',
};

const logoStyle = {
  fontSize: '1.2rem',
  fontFamily: 'verdana',
  border: 'none',
};

const contentStyle = {
  marginTop: '6rem',
};

class Layout extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {
      categories,
      children,
      selectedCategory,
      onSelectCategory,
    } = this.props;

    return (
      <div>
        <Menu fixed="top" style={menuStyle}>
          <Container>
            <Menu.Item style={logoStyle}>
              <Image size="mini" src="/readable-logo.svg" style={imageStyle} />
              Readable
            </Menu.Item>
            <Menu.Item
              as="a"
              active={!selectedCategory}
              onClick={() => onSelectCategory('/')}
            >
              all
            </Menu.Item>
            {categories.map(category => (
              <Menu.Item
                as="a"
                active={selectedCategory === category.name}
                onClick={() => onSelectCategory(`/${category.path}`)}
                key={category.name}
              >
                {category.name}
              </Menu.Item>
            ))}
          </Container>
        </Menu>
        <Container style={contentStyle}>{children}</Container>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
