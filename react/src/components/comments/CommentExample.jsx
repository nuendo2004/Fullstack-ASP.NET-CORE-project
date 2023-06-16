import React from "react";
import PropTypes from "prop-types";
import Comments from "./Comments";
import debug from "sabio-debug";

const _logger = debug.extend("CommentsHolder");
function CommentExample(props) {
  _logger(props, "comm");

  return (
    <div>
      <h1> Comments</h1>
      <Comments blog={props.blog} currentUser={props.currentUser} />
    </div>
  );
}
CommentExample.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    blog: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  comment: PropTypes.shape({
    id: PropTypes.number,
  }),
  blog: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default CommentExample;
