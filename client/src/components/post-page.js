import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { capitalize, isEmpty } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import Comments from './comments';

import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Modal,
  TextArea,
} from 'semantic-ui-react';

import {
  deletePostAction,
  fetchCommentsAction,
  fetchPostAction,
  voteForPostAction,
} from '../actions';

class CommentForm extends Component {
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
      closeModal,
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    } = this.props;

    const labels = this.getFormLabels(errors, touched, 'comment', 'author');

    return (
      <Modal dimmer={true} open={open} onClose={this.closeMe} size="small">
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

const CommentFormik = withFormik({
  mapPropsToValues: () => ({ comment: '', author: '' }),

  validationSchema: Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    author: Yup.string().required('Author is required'),
  }),

  handleSubmit: (values, params) => {
    const { setSubmitting, resetForm, props, setTouched, setErrors } = params;
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      props.closeModal();
      setTouched({ author: false, comment: false });
      setErrors({ author: null, comment: null });
      resetForm();
    }, 1000);
  },
})(CommentForm);

class Post extends Component {
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
          <div>
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
              </Grid.Column>
            </Grid>
            <CommentFormik open={this.state.open} closeModal={this.closeModal} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
