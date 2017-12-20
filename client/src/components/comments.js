import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Button, Comment, Divider, Icon } from 'semantic-ui-react';

class Comments extends Component {
  render() {
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
                  <span>{moment(comment.timestamp).format('ll')}</span>
                  <span>
                    <Icon name="thumbs outline up" /> {comment.voteScore}
                  </span>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
              <Comment.Actions>
                <Comment.Action onClick={() => this.toggleEdit()}>
                  <Button.Group basic size="tiny">
                    <Button icon="edit" />
                    <Button icon="trash outline" />
                    <Button icon="thumbs outline down" />
                    <Button icon="thumbs outline up" />
                  </Button.Group>
                </Comment.Action>
              </Comment.Actions>
              <Divider />
            </Comment>
          ))}
        </Comment.Group>
      )
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps)(Comments);
