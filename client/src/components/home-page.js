import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchCategories, fetchPosts, sortPosts } from '../actions';
import { Button, Card, Dropdown, Icon, Menu } from 'semantic-ui-react';

const menuBarStyle = {
  marginBottom: '3rem',
};

const linkStyle = {
  float: 'right',
};
class HomePage extends Component {
  state = { activeItem: 'all' };

  handleItemClick = location => (event, { name }) => {
    this.setState({ activeItem: name });

    // NB: Making a Menu.Item Link to the new location works
    // but the UI "blinks" when location changes, so I'm doing
    // this instead. See menu-item-with-link-to branch.
    this.props.history.push(location);
  };

  fetchDataForPage = () => {
    // TODO: Should these 3 action creators be combined into 1?
    this.props.fetchCategories();
    this.props.fetchPosts(this.props.match.params.category);
    this.props.sortPosts('voteScore');
  };

  menuBar = () => {
    const { activeItem } = this.state;
    const { categories, sortPosts } = this.props;

    return (
      <Menu size="small" style={menuBarStyle}>
        <Menu.Item
          name="all"
          active={!this.props.match.params.category}
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
              <Dropdown.Item onClick={() => sortPosts('timestamp')}>
                date
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortPosts('voteScore')}>
                votes
              </Dropdown.Item>
              <Dropdown.Item disabled>author</Dropdown.Item>
              <Dropdown.Item disabled>title</Dropdown.Item>
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
                  {moment(post.timestamp).format('ll LT')}
                </span>
              </Card.Content>
              <Card.Content description={post.body.slice(0, 200)} />
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
                  <Link to={`/${post.category}/${post.id}`} style={linkStyle}>
                    More <Icon name="arrow right" />
                  </Link>
                </span>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )
    );
  };

  componentWillMount() {
    this.setState({ activeItem: this.props.match.params.category });
    this.fetchDataForPage();
  }

  /*
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts(this.props.match.params.category);
    this.props.sortPosts('voteScore');
  }
  */

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.fetchDataForPage();
      this.setState({ activeItem: this.props.match.params.category });
    }
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
  fetchPosts: category => dispatch(fetchPosts(category)),
  sortPosts: sortBy => dispatch(sortPosts(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
