import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import { createPostAction } from '../actions';

class PostForm extends Component {
  closeMe = () => {
    const { closeModal, handleReset } = this.props;
    closeModal();
    //handleReset();  // TODO
  };

  // TODO: move to withFormik
  handleSubmit = () => {
    const { closeModal, createPost } = this.props;
    const post = {
      title: 'Error Handling in React 16',
      body:
        'In the past, JavaScript errors inside components used to corrupt React’s internal state and cause it to emit cryptic errors on next renders. These errors were always caused by an earlier error in the application code, but React did not provide a way to handle them gracefully in components, and could not recover from them.',
      author: 'Dan Abramov',
      category: 'react',
      votescore: 4,
    };
    createPost(post).then(result => {
      closeModal();
    });
  };

  render() {
    const { open } = this.props;
    const isSubmitting = false; // TODO

    return (
      <Modal
        open={open}
        dimmer={true}
        closeOnDimmerClick={false}
        onClose={this.closeMe}
        size="small"
      >
        <Modal.Header>Add Post</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <div className="actions">
              <Button
                primary
                disabled={isSubmitting}
                icon="checkmark"
                labelPosition="right"
                content="Submit"
              />
              <Button
                color="grey"
                icon="cancel"
                labelPosition="right"
                content="Cancel"
                onClick={this.closeMe}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

//export default PostForm;

//const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPostAction(post)),
});

export default connect(null, mapDispatchToProps)(PostForm);
