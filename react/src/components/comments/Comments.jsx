import React, { useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import commentService from "services/commentService";
import "./comments.css";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Form, Row } from "react-bootstrap";
import toastr from "toastr";
import commentSchema from "schemas/commentSchema";

const _logger = debug.extend("CommentsHolder");

function Comments(props) {
  const [pageData, setPageData] = useState({
    arrayOfComments: [],
    commentComponents: [],
  });
  
  const [getComment] = useState({
    subject: "",
    text: "",
    parentId: null,
    entityTypeId: 7,
    entityId: props.blog.id,
    createdBy: props.currentUser,
  });

  const getAllComments = () => {
    commentService
      .selectByEntityId(getComment.entityId, getComment.entityTypeId)
      .then(onGetCommentSuccess)
      .catch(onGetCommentError);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const onGetCommentSuccess = (response) => {
    let arrayOfComments = response.items;
    setPageData((prevState) => {
      const pdata = { ...prevState };
      pdata.arrayOfComments = arrayOfComments;
      pdata.commentComponents = arrayOfComments.map(mapComments);
      return pdata;
    });
  };

  const onGetCommentError = (err) => {
    _logger(err);
  };

  const onAddClick = (values) => {
    const onAddCommentSuccess = (response) => {
      toastr.success("Comment Added!");
      const payload = {
        ...values,
        createdBy: {
          id: props.currentUser.id,
          firstName: props.currentUser.firstName,
          lastName: props.currentUser.lastName,
          avatarUrl: props.currentUser.avatarUrl,
        },
        id: response?.item,
      };
      onCommentAdd(payload);
      getAllComments();
    };
    commentService
      .addComment(values)
      .then(onAddCommentSuccess)
      .catch(onAddCommentError);
  };

  const onAddCommentError = (err) => {
    toastr.error("Comment fail to add!");
    _logger(err);
  };

  const onCommentAdd = (newComment) => {
    const newComments = [...pageData.arrayOfComments];
    newComments.push(newComment);

    setPageData((prevState) => {
      const pdata = { ...prevState };
      pdata.arrayOfComments = newComments;
      pdata.commentComponents = newComments.map(mapComments);
      return pdata;
    });
  };

  const onUpdateClick = useCallback((values) => {
    const onUpdateCommentSuccess = (response) => {
      _logger(response);
      getAllComments();
      toastr.success("Comment updated!");
    };
    commentService
      .updateComment(values, values.id)
      .then(onUpdateCommentSuccess)
      .catch(onUpdateCommentError);
  }, []);

  const onUpdateCommentError = (error) => {
    toastr.error("Comment failed to edit!");
    _logger(error);
  };

  const mapComments = (comment) => {
    return (
      <div key={"Comment_" + comment.id}>
        <Comment
          comment={comment}
          currentUser={props.currentUser}
          onDeleteRequested={onDeleteRequested}
          onAddClick={onAddClick}
          onUpdateClick={onUpdateClick}
        />
      </div>
    );
  };

  const onDeleteRequested = useCallback((aComment) => {
    _logger("onDeleteRequested", aComment);
    const handler = getDeleteSuccessHandler(aComment.id);
    commentService.deleteComment(aComment.id).then(handler).catch(onGetError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    return () => {
      getAllComments();
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfComments = [...pd.arrayOfComments];
        const idxOf = pd.arrayOfComments.findIndex((comment) => {
          let result = false;
          if (comment.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          pd.arrayOfComments.splice(idxOf, 1);
          pd.commentComponents = pd.arrayOfComments.map(mapComments);
        }
        return pd;
      });
      toastr.success("Comment deleted!");
    };
  };
  const onGetError = (err) => {
    _logger("delete", err);
    toastr.error("Comment failed to delete!");
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={getComment}
        onSubmit={onAddClick}
        validationSchema={commentSchema}
      >
        <FormikForm>
          <Row>
            <h1>Comments</h1>
            <Form.Group>
              <Form.Label className="comment-form">
                <Field
                  component="textarea"
                  name="text"
                  className="form-control"
                  placeholder="Write a comment here..."
                />
              </Form.Label>
              <ErrorMessage name="text" components="" />
            </Form.Group>
          </Row>
          <div className="d-grid col-md-2">
            <div className="comment-btn">
              <button type="submit" className="m-2 btn btn-primary">
                Add Comment
              </button>
            </div>
          </div>
        </FormikForm>
      </Formik>

      <div className="comment-container">
        <div className="col-12 my-1 ">
          <div className="row">{pageData.commentComponents}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

Comments.propTypes = {
  createdBy: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default Comments;
