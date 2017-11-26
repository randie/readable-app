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

const menuBarStyle = {
  marginBottom: '3rem',
};
class HomePage extends Component {
  state = { activeItem: 'all' };

  handleItemClick = location => (event, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(location);
  };

  menuBar = () => {
    const { activeItem } = this.state;
    const { categories } = this.props;

    return (
      <Menu size="tiny" style={menuBarStyle}>
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
    );
  };

  postCards = () => {
    const { posts } = this.props;
    return (
      posts &&
      posts.length && (
        <Card.Group itemsPerRow={3}>
          {posts.map(post => (
            <Card centered key={post.id}>
              <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>{moment(post.timestamp).format('ll LT')}</Card.Meta>
              </Card.Content>
              <Card.Content description={post.body} />
              <Card.Content>
                <span>
                  <Icon disabled name="user" />
                  {post.author}
                </span>
                <span>
                  <Icon disabled name="tag" />
                  {post.category}
                </span>
                <span>
                  <Icon disabled name="thumbs up" />
                  {post.voteScore}
                </span>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )
    );
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        {this.menuBar()}
        {this.postCards()}
      </div>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => ({ categories, posts });

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
