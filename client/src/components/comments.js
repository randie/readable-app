import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Button, Comment, Divider, Icon } from 'semantic-ui-react';
import { deleteCommentAction, voteForCommentAction } from '../actions';
import CommentForm from './comment-form';

// This is a private component used only by the Comments component below.
// This component represents a comment on a post, different from Comment,
// the UI component from Semantic UI.
class PostComment extends Component {
  state = { open: false };

  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });

  deleteComment = commentId => {
    const { deleteComment, refetchPost } = this.props;
    deleteComment(commentId).then(() => refetchPost());
  };

  render() {
    const { closeModal, state: { open }, props: { comment, voteForComment, refetchPost } } = this;

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author>{comment.author}</Comment.Author>
          <Comment.Metadata>
            <span>{moment(comment.timestamp).format('lll')}</span>
            <span>
              <Icon name="thumbs outline up" /> {comment.voteScore}
            </span>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
        </Comment.Content>
        <Button.Group basic size="tiny">
          <Button icon="thumbs outline up" onClick={() => voteForComment(comment.id, 'upVote')} />
          <Button
            icon="thumbs outline down"
            onClick={() => voteForComment(comment.id, 'downVote')}
          />
          <Button icon="edit" onClick={this.openModal} />
          <Button icon="trash outline" onClick={() => this.deleteComment(comment.id)} />
        </Button.Group>
        <Divider />
        <CommentForm
          open={open}
          closeModal={closeModal}
          comment={comment}
          refetchPost={refetchPost}
        />
      </Comment>
    );
  }
}

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
  };

  render() {
    const { comments } = this.props;
    return (
      !isEmpty(comments) && (
        <div>
          <Comment.Group>
            <Divider horizontal section>
              Comments
            </Divider>
            {comments.map(comment => (
              <PostComment key={comment.id} comment={comment} {...this.props} />
            ))}
          </Comment.Group>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteCommentAction(commentId)),
  voteForComment: (commentId, voteType) => dispatch(voteForCommentAction(commentId, voteType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
