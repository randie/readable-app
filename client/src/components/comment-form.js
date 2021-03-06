import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import { isEmpty } from 'lodash';
import { Button, Form, Input, Modal, TextArea } from 'semantic-ui-react';
import { createCommentAction, editCommentAction } from '../actions';

class CommentForm extends Component {
  closeMe = () => {
    const { closeModal, handleReset } = this.props;
    closeModal();
    handleReset();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.comment !== this.props.comment) {
      this.props.resetForm(nextProps.comment);
    }
  }

  getFormLabels(errors, touched, ...fields) {
    const labels = {};
    fields.forEach(field => {
      labels[field] = !errors[field] || !touched[field] ?
        (capitalize(field)) : (<span style={{ color: 'red' }}>{errors[field]}</span>);
    });
    return labels;
  }

  render() {
    const {
      open,
      comment,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    const title = isEmpty(comment) ? 'Add Comment' : 'Edit Comment';
    const labels = this.getFormLabels(errors, touched, 'body', 'author');

    return (
      <Modal
        open={open}
        dimmer={true}
        closeOnDimmerClick={false}
        onClose={this.closeMe}
        size="small"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} loading={isSubmitting}>
            <Form.Field>
              <label>{labels.body}</label>
              <TextArea
                name="body"
                value={values.body}
                placeholder="Write your comment here"
                onChange={handleChange}
                onBlur={handleBlur}
                autoHeight
              />
            </Form.Field>
            <Form.Field>
              <label>{labels.author}</label>
              <Input
                type="text"
                name="author"
                value={values.author}
                placeholder="Write your name here"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
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

const CommentFormik = withFormik({
  mapPropsToValues: ({ comment = { body: '', author: '' } }) => {
    return { body: comment.body, author: comment.author };
  },

  validationSchema: Yup.object().shape({
    body: Yup.string().required('Body is required'),
    author: Yup.string().required('Author is required'),
  }),

  handleSubmit: (values, params) => {
    const { props, resetForm } = params;

    const closeCommentForm = () => {
      props.closeModal();
      resetForm();
    };

    let commentData;
    if (isEmpty(props.comment)) {
      commentData = {
        parentId: props.post.id,
        body: values.body,
        author: values.author,
      };
      props.createComment(commentData).then(() => {
        props.refetchPost();
        closeCommentForm();
      });
    } else {
      commentData = {
        commentId: props.comment.id,
        body: values.body,
        author: values.author,
      };
      props.editComment(commentData).then(closeCommentForm);
    }
  },
})(CommentForm);

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  createComment: ({ parentId, body, author }) =>
    dispatch(createCommentAction({ parentId, body, author })),
  editComment: ({ commentId, body, author }) =>
    dispatch(editCommentAction({ commentId, body, author })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormik);
