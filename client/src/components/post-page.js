import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost } from '../actions';
import { Card } from 'semantic-ui-react';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    fetchPost: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchDataForPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.fetchDataForPage();
    }
  }

  fetchDataForPage() {
    const { postId } = this.props.match.params;
    this.props.fetchPost(postId);
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        {post && (
          <Card fluid>
            <Card.Content header={post.title} />
            <Card.Content description={post.body} />
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
