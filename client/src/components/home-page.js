import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchCategories, fetchPosts } from '../actions';
import {
  Button,
  Card,
  Container,
  Dropdown,
  Icon,
  Menu,
} from 'semantic-ui-react';

class HomePage extends Component {
  state = { activeItem: 'all' };

  handleItemClick = location => (event, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(location);
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { activeItem } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <Menu size="tiny">
          <Menu.Item
            name="all"
            active={activeItem === 'all'}
            onClick={this.handleItemClick('/')}
          />
          {categories.map(category => (
            <Menu.Item
              name={category.name}
              active={category.name === activeItem}
              onClick={this.handleItemClick(`/${category.path}`)}
              key={category.name}
            />
          ))}

          <Menu.Menu position="right">
            <Dropdown item text="Sort by">
              <Dropdown.Menu>
                <Dropdown.Item disabled>author</Dropdown.Item>
                <Dropdown.Item>date</Dropdown.Item>
                <Dropdown.Item disabled>title</Dropdown.Item>
                <Dropdown.Item>votes</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Button primary>New Post</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
//<Button content="New Post" icon="add" labelPosition="left" primary />;

const mapStateToProps = ({ categories, posts }) => ({ categories, posts });
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
