import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPosts } from '../actions';
import {
  Button,
  Card,
  Container,
  Dropdown,
  Icon,
  Menu,
} from 'semantic-ui-react';

class HomePage extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu size="tiny">
          <Menu.Item
            name="All"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="react"
            active={activeItem === 'react'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="redux"
            active={activeItem === 'redux'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="udacity"
            active={activeItem === 'udacity'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="javascript"
            active={activeItem === 'javascript'}
            onClick={this.handleItemClick}
          />

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

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
