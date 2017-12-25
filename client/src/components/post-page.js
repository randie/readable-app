import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Comments from './comments';
import CommentForm from './comment-form';
import { Button, Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';

import {
  deletePostAction,
  fetchCommentsAction,
  fetchPostAction,
  voteForPostAction,
} from '../actions';

class PostPage extends Component {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    fetchPost: PropTypes.func.isRequired,
    voteForPost: PropTypes.func.isRequired,
  };

  state = { open: false };

  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });

  componentDidMount() {
    this.fetchDataForPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.fetchDataForPage();
    }
  }

  fetchDataForPage() {
    const { fetchPost, fetchComments, match: { params: { postId } } } = this.props;
    fetchPost(postId);
    fetchComments(postId);
  }

  refetchPost = () => {
    // NB: The /comments api doesn't seem to automatically update the
    // post's commentCount when a comment is added or deleted from it.
    // In order to see the new commentCount on this page, the post has
    // to refresh itself. This is a way to manually make the post fetch
    // its data again. [2017-12-24]
    const { fetchPost, match: { params: { postId } } } = this.props;
    fetchPost(postId);
  };

  deletePost = () => {
    const { deletePost, post, history } = this.props;
    deletePost(post.id).then(() => history.push('/'));
  };

  renderPostMeta = post => (
    <div className="post-meta">
      <span>
        <Icon name="user" disabled />
        {post.author}
      </span>
      <span>
        <Icon name="calendar outline" disabled />
        {moment(post.timestamp).format('lll')}
      </span>
      <span>
        <Icon name="tag" disabled />
        {post.category}
      </span>
      <span>
        <Icon name="thumbs up" disabled />
        {post.voteScore}
      </span>
      <span>
        <Icon disabled name="comment" />
        {post.commentCount}
      </span>
    </div>
  );

  renderPostControls = post => (
    <Button.Group basic vertical labeled icon floated="right" className="edit-delete-thumbs">
      <Button icon="edit" content="Edit" />
      <Button icon="trash outline" content="Delete" onClick={this.deletePost} />
      <Button
        icon="thumbs outline up"
        content="Upvote"
        onClick={() => this.props.voteForPost(post.id, 'upVote')}
      />
      <Button
        icon="thumbs outline down"
        content="Downvote"
        onClick={() => this.props.voteForPost(post.id, 'downVote')}
      />
      <Button icon="commenting outline" content="Comment" onClick={this.openModal} />
    </Button.Group>
  );

  render() {
    const { post } = this.props;
    const { state: { open }, closeModal, refetchPost } = this;

    return (
      <Container>
        <Divider />
        {!isEmpty(post) && (
          <div>
            <Grid>
              <Grid.Column width={12}>
                <Header as="h2">{post.title}</Header>
                {this.renderPostMeta(post)}
                <p>{post.body}</p>
                <Comments refetchPost={refetchPost} />
              </Grid.Column>
              <Grid.Column width={4}>{this.renderPostControls(post)}</Grid.Column>
            </Grid>
            <CommentForm open={open} closeModal={closeModal} refetchPost={refetchPost} />
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePostAction(postId)),
  fetchComments: postId => dispatch(fetchCommentsAction(postId)),
  fetchPost: postId => dispatch(fetchPostAction(postId)),
  voteForPost: (postId, voteType) => dispatch(voteForPostAction(postId, voteType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
