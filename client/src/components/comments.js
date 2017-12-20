import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Divider } from 'semantic-ui-react';

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      !isEmpty(comments) && (
        <div>
          <Divider horizontal section>
            Comments
          </Divider>
          <p>Comments</p>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps)(Comments);
