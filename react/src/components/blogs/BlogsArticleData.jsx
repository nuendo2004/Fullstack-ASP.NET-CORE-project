import React, { useEffect, useState } from "react";
import BlogArticle from "./BlogArticle";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const BlogArticleData = (props) => {
  const [myBlog, setMyBlog] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.type === "BLOG VIEW" && state.aBlog)
      setMyBlog(() => {
        return state.aBlog;
      });
  });

  return (
    <>
      {myBlog && (
        <BlogArticle
          blog={myBlog}
          currentUser={props.currentUser}
        ></BlogArticle>
      )}
    </>
  );
};
BlogArticleData.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default BlogArticleData;
