import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Button, Form, Input, Modal, TextArea } from 'semantic-ui-react';
import { createCommentAction } from '../actions';

class CommentFormBase extends Component {
  closeMe = () => {
    const { closeModal, handleReset, setErrors } = this.props;
    setErrors({});
    handleReset();
    closeModal();
  };

  getFormLabels(errors, touched, ...fields) {
    const labels = {};
    fields.forEach(field => {
      labels[field] =
        !errors[field] || !touched[field] ? (
          capitalize(field)
        ) : (
          <span style={{ color: 'red' }}>{errors[field]}</span>
        );
    });
    return labels;
  }

  render() {
    const {
      open,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    const labels = this.getFormLabels(errors, touched, 'comment', 'author');

    return (
      <Modal
        open={open}
        dimmer={true}
        closeOnDimmerClick={false}
        onClose={this.closeMe}
        size="small"
      >
        <Modal.Header>Add Comment</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} loading={isSubmitting}>
            <Form.Field>
              <label>{labels.comment}</label>
              <TextArea
                name="comment"
                value={values['comment']}
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
                value={values['author']}
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

const CommentForm = withFormik({
  mapPropsToValues: () => ({ comment: '', author: '' }),

  validationSchema: Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    author: Yup.string().required('Author is required'),
  }),

  handleSubmit: (values, params) => {
    const { setSubmitting, resetForm, props, setTouched, setErrors } = params;
    const commentData = {
      parentId: props.post.id,
      body: values.comment,
      author: values.author,
    };
    props.createComment(commentData).then(result => {
      props.updateCommentCount();
      props.closeModal();
      setSubmitting(false);
      setTouched({ author: false, comment: false });
      setErrors({ author: null, comment: null });
      resetForm();
    });
  },
})(CommentFormBase);

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = dispatch => ({
  createComment: ({ parentId, body, author }) =>
    dispatch(createCommentAction({ parentId, body, author })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
