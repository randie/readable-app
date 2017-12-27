import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Button, Form, Input, Modal, TextArea } from 'semantic-ui-react';
import { createPostAction } from '../actions';

class PostForm extends Component {
  closeMe = () => {
    const { closeModal, handleReset } = this.props;
    closeModal();
    handleReset();
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

    const labels = this.getFormLabels(errors, touched, 'title', 'body', 'author');

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
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>{labels.title}</label>
              <Input
                type="text"
                name="title"
                value={values['title']}
                placeholder="Write your title here"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field>
              <label>{labels.body}</label>
              <TextArea
                name="body"
                value={values['body']}
                placeholder="Write your content here"
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

const PostFormik = withFormik({
  mapPropsToValues: () => ({ title: '', body: '', author: '' }),

  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    author: Yup.string().required('Author is required'),
  }),

  handleSubmit: (values, params) => {
    const { setSubmitting, resetForm, props, setTouched, setErrors } = params;
    const postData = {
      title: values.title,
      body: values.body,
      author: values.author,
      category: 'react', // TODO
    };
    props.createPost(postData).then(result => {
      props.resetActiveCategory();
      props.refetchPosts();
      props.closeModal();
      setSubmitting(false);
      setTouched({ title: false, body: false, author: false });
      setErrors({ title: null, body: null, author: null });
      resetForm();
    });
  },
})(PostForm);

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPostAction(post)),
});

export default connect(null, mapDispatchToProps)(PostFormik);
