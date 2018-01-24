import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import PostForm from './post-form';
import { Button, Card, Container, Dropdown, Icon, Menu } from 'semantic-ui-react';

import {
  deletePostAction,
  fetchCategoriesAction,
  fetchPostsAction,
  sortPostsAction,
  voteForPostAction
} from '../actions';

// This is a private component used only by the HomePage component below
class MenuBar extends Component {
  state = { activeItem: 'all', open: false };

  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });

  resetActiveCategory = () => this.setState({ activeItem: 'all' });

  handleMenuItemClick = location => (event, { name }) => {
    this.setState({ activeItem: name });
    this.props.setActiveCategory(name);

    // NB: Making a Menu.Item Link to the new location works
    // but the UI "blinks" when location changes, so I'm doing
    // this instead. See menu-item-with-link-to branch.
    this.props.history.push(location);
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.setState({ activeItem: this.props.match.params.category || 'all' });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({ activeItem: this.props.match.params.category || 'all' });
    }
  }

  render() {
    const {
      state: { activeItem, open },
      props: { categories, sortPosts, fetchPosts },
      closeModal,
      openModal,
      handleMenuItemClick,
      resetActiveCategory,
    } = this;

    return (
      <div>
        <Menu size="mini">
          {categories.map(category => (
            <Menu.Item
              name={category.name}
              active={category.name === activeItem}
              onClick={handleMenuItemClick(`/${category.path}`)}
              key={category.name}
            />
          ))}

          <Menu.Menu position="right">
            <Dropdown item text="Sort by">
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortPosts('timestamp', 'desc')}>Newest</Dropdown.Item>
                <Dropdown.Item onClick={() => sortPosts('timestamp', 'asc')}>Oldest</Dropdown.Item>
                <Dropdown.Item onClick={() => sortPosts('voteScore', 'desc')}>Most Votes</Dropdown.Item>
                <Dropdown.Item onClick={() => sortPosts('author', 'asc')}>Author</Dropdown.Item>
                <Dropdown.Item onClick={() => sortPosts('title', 'asc')}>Title</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Button primary content="New Post" onClick={openModal} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <PostForm
          open={open}
          closeModal={closeModal}
          resetActiveCategory={resetActiveCategory}
          refetchPosts={fetchPosts}
        />
      </div>
    );
  }
}

// This is a private component used only by the HomePage component below
//function PostCards({ posts, voteForPost }) {
function PostCards(props) {
  return (
    (isEmpty(props.posts) && 'No posts found.') || (
      <Card.Group itemsPerRow={3}>
        {props.posts.map(post => (
          <Card centered key={post.id}>
            <Card.Content>
              <Card.Header>
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <span>
                <Icon name="user" />
                {post.author}
              </span>
              <span>
                <Icon name="calendar outline" />
                {moment(post.timestamp).format('lll')}
              </span>
            </Card.Content>
            <Card.Content>
              {post.body.slice(0, 200)}
              <div className="post-controls">
                <Button.Group basic size="tiny">
                  <Button
                    icon="thumbs outline up"
                    onClick={() => {
                      props.voteForPost(post.id, 'upVote').then(() => props.fetchPosts(props.activeCategory));
                    }}
                  />
                  <Button
                    icon="thumbs outline down"
                    onClick={() => {
                      props.voteForPost(post.id, 'downVote').then(() => props.fetchPosts(props.activeCategory));
                    }}
                  />
                  <Button icon="edit" onClick={() => window.alert('edit post')} />
                  <Button
                    icon="trash outline"
                    onClick={() => {
                      props.deletePost(post.id).then(() => props.fetchPosts(props.activeCategory));
                    }}
                  />
                </Button.Group>
              </div>
            </Card.Content>
            <Card.Content>
              <span>
                <Icon disabled name="tag" />
                {post.category}
              </span>
              <span>
                <Icon disabled name="thumbs up" />
                {post.voteScore}
              </span>
              <span>
                <Icon disabled name="comment" />
                {post.commentCount}
              </span>
              <span>
                <Link to={`/${post.category}/${post.id}`} className="read-more">
                  Read<Icon name="angle double right" />
                </Link>
              </span>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  );
}

class HomePage extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
    fetchCategories: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    sortPosts: PropTypes.func.isRequired,
  };

  state = { activeCategory: 'all' };

  setActiveCategory = category => this.setState({ activeCategory: category });

  componentDidMount() {
    const { fetchPosts, match } = this.props;
    fetchPosts(match.params.category);
  }

  componentDidUpdate(prevProps) {
    const { fetchPosts, match } = this.props;
    if (match.url !== prevProps.match.url) {
      fetchPosts(match.params.category);
    }
  }

  render() {
    return (
      <Container>
        <MenuBar {...this.props} setActiveCategory={this.setActiveCategory} />
        <PostCards {...this.props} activeCategory={this.state.activeCategory} />
      </Container>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories: [{ name: 'all', path: '' }, ...categories],
  posts,
});

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePostAction(postId)),
  fetchCategories: () => dispatch(fetchCategoriesAction()),
  fetchPosts: category => dispatch(fetchPostsAction(category)),
  sortPosts: (sortBy, order) => dispatch(sortPostsAction(sortBy, order)),
  voteForPost: (postId, voteType) => dispatch(voteForPostAction(postId, voteType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
