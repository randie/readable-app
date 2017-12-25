import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Button, Comment, Divider, Icon } from 'semantic-ui-react';
import { deleteCommentAction } from '../actions';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
  };

  deleteComment = commentId => {
    const { deleteComment, refetchPost } = this.props;
    deleteComment(commentId).then(() => refetchPost());
  };

  render() {
    debugger;
    const { comments } = this.props;

    return (
      !isEmpty(comments) && (
        <Comment.Group>
          <Divider horizontal section>
            Comments
          </Divider>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author as="a">{comment.author}</Comment.Author>
                <Comment.Metadata>
                  <span>{moment(comment.timestamp).format('lll')}</span>
                  <span>
                    <Icon name="thumbs outline up" /> {comment.voteScore}
                  </span>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
              <Button.Group basic size="tiny">
                <Button icon="edit" onClick={() => window.alert('edit comment')} />
                <Button icon="trash outline" onClick={() => this.deleteComment(comment.id)} />
                <Button icon="thumbs outline up" onClick={() => window.alert('upvote comment')} />
                <Button
                  icon="thumbs outline down"
                  onClick={() => window.alert('downvote comment')}
                />
              </Button.Group>
              <Divider />
            </Comment>
          ))}
        </Comment.Group>
      )
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteCommentAction(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
