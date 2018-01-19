import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import { isEmpty } from 'lodash';
import { Button, Dropdown, Form, Input, Modal, TextArea } from 'semantic-ui-react';
import { createPostAction, editPostAction, fetchCategoriesAction } from '../actions';

class PostForm extends Component {
  closeMe = () => {
    const { closeModal, handleReset } = this.props;
    closeModal();
    handleReset();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      this.props.resetForm(nextProps.post);
    }
  }

  handleCategoryChange = (event, data) => {
    this.props.setFieldValue('category', data.value);
  };

  handleCategoryBlur = () => {
    this.props.setFieldTouched('category', true);
  };

  componentDidMount() {
    this.props.fetchCategories();
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
      post,
      categories,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    const title = isEmpty(post) ? 'Add Post' : 'Edit Post';
    const labels = this.getFormLabels(errors, touched, 'title', 'body', 'category', 'author');

    const categoryOptions = categories.map(({ name }) => {
      return { key: name, value: name, text: capitalize(name) };
    });

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
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>{labels.title}</label>
              <Input
                type="text"
                name="title"
                value={values.title}
                placeholder="Write your title here"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field>
              <label>{labels.body}</label>
              <TextArea
                name="body"
                value={values.body}
                placeholder="Write your content here"
                onChange={handleChange}
                onBlur={handleBlur}
                autoHeight
              />
            </Form.Field>
            <Form.Field>
              <label>{labels.category}</label>
              <Dropdown
                defaultValue={values.category}
                placeholder="Select a category"
                search
                selection
                options={categoryOptions}
                onChange={this.handleCategoryChange}
                onBlur={this.handleCategoryBlur}
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

const PostFormik = withFormik({
  mapPropsToValues: ({ post = { title: '', body: '', category: '', author: '' } }) => {
    return {
      title: post.title,
      body: post.body,
      category: post.category,
      author: post.author,
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    category: Yup.string().required('Category is required'),
    author: Yup.string().required('Author is required'),
  }),

  handleSubmit: (values, params) => {
    const { title, body, category, author } = values;
    const { props, setSubmitting, resetForm } = params;

    if (isEmpty(props.post)) {
      props.createPost({ title, body, category, author }).then(result => {
        props.resetActiveCategory();
        props.refetchPosts();
        props.closeModal();
        resetForm();
      });
    } else {
      props.editPost({ postId: props.post.id, post: values }).then(result => {
        props.closeModal();
        setSubmitting(false);
      });
    }
  },
})(PostForm);

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPostAction(post)),
  editPost: ({ postId, post }) => dispatch(editPostAction({ postId, post })),
  fetchCategories: () => dispatch(fetchCategoriesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFormik);
