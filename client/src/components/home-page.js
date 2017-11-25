import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Icon } from 'semantic-ui-react';
import Layout from './layout';
import { fetchPosts } from '../actions';

class HomePage extends Component {
  selectCategory = location => {
    this.props.history.push(location);
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
    this.props.fetchPosts();
  }

  render() {
    const selectedCategory = this.props.match.params.category;
    return (
      <Layout
        selectedCategory={selectedCategory}
        onSelectCategory={this.selectCategory}
      >
        {this.postCards()}
      </Layout>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
