import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import debug from "sabio-debug";
import "./comments.css";
import { formatDateTime } from "utils/dateFormater";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Form, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";
import commentSchema from "schemas/commentSchema";

const _logger = debug.extend("Comment");

const Comment = ({ comment, currentUser, onDeleteRequested, onAddClick, onUpdateClick }) => {
  const [pageData, setPageData] = useState({
    arrayOfReplies: [],
    replyComponents: [],
  });
  
  const [commentPayload, setCommentPayload] = useState({
    subject: comment?.subject,
    text: "",
    id: comment?.id,
    parentId: comment.id,
    entityTypeId: comment?.entityType?.id,
    entityId: comment?.entityId,
  });

  const [show, setShowTextBox] = useState(false);
  const [showEdit, setShowEditBox] = useState(false);

  useEffect(() => {
    setPageData((prevState) => {
      const data = { ...prevState };
      data.arrayOfReplies = comment.replies;
      if (comment.replies && comment.replies.length > 0) {
        data.replyComponents = comment.replies.map(mapReplies);
      }
      return data;
    });
  }, [comment]);

  const mapReplies = (singleComment) => {
    return (
      <div key={"Reply_" + singleComment.id} className="comment-reply">
        <Comment
          comment={singleComment}
          currentUser={currentUser}
          onDeleteRequested={onDeleteRequested}
          onAddClick={onAddClick}
          onUpdateClick={onUpdateClick}
        />
      </div>
    );
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCommentPayload((comment) => {
      let newComment = { ...comment };
      newComment[name] = value;
      return newComment;
    });
  };

  const onReplyClick = () => {
    setShowTextBox(!show);
  };

  const onAddReply = () => {
    setShowTextBox(!show)
    onAddClick(commentPayload);
  };

  const onEditClick = () => {
    setShowEditBox(!showEdit);
  };

  const onEditComment = () => {
    setShowEditBox(!showEdit);
    onUpdateClick(commentPayload);
    _logger(commentPayload, "commentPayload")
  };

  const localDelete =  useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
      text:"This can't be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteRequested(comment)
      }
    });
  }, []);

  const timePosted = (dateCreated) => {
    const utcDate = `${dateCreated}`;
    const date = formatDateTime(utcDate);
    return date;
  };

  return (
    <React.Fragment>
      <div className="comment-container">
        <div className="comment-card">
          <img
            className="card-img-top"
            src={comment.createdBy.avatarUrl}
            alt=""
          />
          <strong className="comment-name">
            {" "}
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </strong>
          <p className="comment-date">{timePosted(comment.dateCreated)}</p>
          <p className="comment-text" type="text">
            {" "}
            {comment.text}
          </p>
          
          <Formik enableReinitialize={true} initialValues={commentPayload}  validationSchema={commentSchema}>
            <FormikForm>
              <Row>
                <Form.Group>
                  {show ? (
                    <Form.Label className="reply-form">
                      <Field
                        component="textarea"
                        name="text"
                        onChange={changeHandler}
                        value={commentPayload.text}
                        className="form-control"
                        placeholder="Enter response here..."
                      />
                    </Form.Label>
                  ) : null}
                  <ErrorMessage name="text" components="" />
                </Form.Group>
              </Row>
              <div className="d-grid col-md-2">
                <div className="reply-btn">
                  <button
                    type="submit"
                    className="m-2 btn btn-primary"
                    onClick={show ? onAddReply : onReplyClick}
                  >
                    {show ? "Add" : "Reply" } 
                  </button>
                </div>
              </div>
            </FormikForm>
          </Formik>

          <Formik enableReinitialize={true} initialValues={commentPayload}>
            <FormikForm>
              <Row>
                <Form.Group>
                  {showEdit ? (
                    <Form.Label className="edit-form">
                      <Field
                        component="textarea"
                        name="text"
                        onChange={changeHandler}
                        value={commentPayload.text}
                        className="form-control"
                        placeholder="Update comment here..."
                      />
                    </Form.Label>
                  ) : null}
                  <ErrorMessage name="text" components="" />
                </Form.Group>
              </Row>

              {currentUser.id === comment.createdBy.id ? (
                <OverlayTrigger
                  key={`${comment.id}_Update`}
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top`}>{showEdit ? "Add" : "Edit" }</Tooltip>}
                >
                  <Icon.Pencil
                    onClick={showEdit ? onEditComment : onEditClick}
                    color="Blue"
                    size={20}
                    className="edit-comment-btn"
                  />
                </OverlayTrigger>
              ) : null}

              {currentUser.id === comment.createdBy.id ? (
                <OverlayTrigger
                  key={`${comment.id}_Delete`}
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
                >
                  <Icon.Trash
                    onClick={localDelete}
                    color="red"
                    size={20}
                    className="dlt-comment-btn"
                  />
                </OverlayTrigger>
              ) : null}
            </FormikForm>
          </Formik>
          <div className="reply-card">{pageData.replyComponents} </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateCreated: PropTypes.string,
    entityId: PropTypes.number.isRequired,
    entityType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    subject: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  }),
  currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  onDeleteRequested: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
};

export default Comment;
