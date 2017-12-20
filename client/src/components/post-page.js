import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Comments from './comments';
import { deletePost, fetchComments, fetchPost, voteForPost } from '../actions';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    fetchPost: PropTypes.func.isRequired,
    voteForPost: PropTypes.func.isRequired,
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
    const {
      fetchPost,
      fetchComments,
      match: { params: { postId } },
    } = this.props;
    fetchPost(postId);
    fetchComments(postId);
  }

  deletePost = () => {
    const { deletePost, post, history } = this.props;
    deletePost(post.id).then(() => history.push('/'));
  };

  render() {
    const { post } = this.props;

    return (
      <Container>
        <Divider />
        {!isEmpty(post) && (
          <Grid>
            <Grid.Column width={12}>
              <Header as="h2">{post.title}</Header>
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
              <p>{post.body}</p>
              <Comments />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group
                basic
                vertical
                labeled
                icon
                floated="right"
                className="edit-delete-thumbs"
              >
                <Button icon="edit" content="Edit" />
                <Button
                  icon="trash outline"
                  content="Delete"
                  onClick={this.deletePost}
                />
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
                <Button icon="commenting outline" content="Comment" />
              </Button.Group>
            </Grid.Column>
          </Grid>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  fetchComments: postId => dispatch(fetchComments(postId)),
  fetchPost: postId => dispatch(fetchPost(postId)),
  voteForPost: (postId, voteType) => dispatch(voteForPost(postId, voteType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
