import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import blogService from "../../services/blogService";
import toastr from "toastr";
import PropTypes from "prop-types";
import "./blogs.css";
import BlogCard from "./BlogCard";

const _logger = debug.extend("Blogs");

const Blogs = () => {
  const [arrayOfBlogs, setArrayofBlogs] = useState({
    data: [],
    components: [],
  });

  const [payload, setPayload] = useState({
    pageIndex: 0,
    pageSize: 10,
    isApproved: true,
    isPublished: false,
    isDeleted: true,
  });

  const changeApproval = (id, isApproved) => {
    blogService
      .updateApproval(id, isApproved)
      .then(updateList)
      .catch(onUpdateError);
  };

  const updateList = (res) => {
    setArrayofBlogs((prevState) => {
      const newBlogs = { ...prevState };
      const indexOf = newBlogs.components.findIndex((singleComp) => {
        return parseInt(singleComp.key) === parseInt(res.id);
      });
      if (indexOf > -1) {
        newBlogs.components.splice(indexOf, 1);
      } else {
      }
      return newBlogs;
    });
  };

  const onUpdateError = (err) => {
    _logger("onUpdateError", err);
    toastr.error("Update Failed!");
    setArrayofBlogs({ components: [] });
  };

  const mapBlog = (blog, index) => {
    return (
      <BlogCard
        key={blog.id}
        blog={blog}
        changeApproval={changeApproval}
        index={index}
      />
    );
  };

  useEffect(() => {
    blogService
      .getAllBlogs(
        payload.pageIndex,
        payload.pageSize,
        payload.isApproved,
        payload.isPublished,
        payload.isDeleted
      )
      .then(onGetBlogSuccess)
      .catch(onGetBlogError);
  }, [payload.isApproved]);

  const onGetBlogSuccess = (response) => {
    let arrayOfBlogs = response.item.pagedItems;
    setArrayofBlogs((prevState) => {
      const newState = { ...prevState };
      newState.data = arrayOfBlogs;
      newState.components = arrayOfBlogs.map(mapBlog);
      return newState;
    });
  };

  const onGetBlogError = (err) => {
    _logger("onGetError", err);
    toastr.error("No Blogs to display.");
    setArrayofBlogs({ data: [], components: [] });
  };

  const switchBlogs = () => {
    setPayload((prevState) => {
      const newState = { ...prevState };
      newState.isApproved = !newState.isApproved;
      return newState;
    });
  };

  return (
    <div className="container-approval-switch">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          defaultChecked={payload.isApproved}
          id={payload.isApproved}
          onChange={switchBlogs}
        />
        <label className="check-label" htmlFor="flexSwitchCheckDefault">
          Approved Blogs
        </label>
      </div>
      <div className="blog-page-container">{arrayOfBlogs.components}</div>
    </div>
  );
};

Blogs.propTypes = {
  blog: PropTypes.shape({
    isApproved: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    datePublished: PropTypes.string.isRequired,
  }).isRequired,
  changeApproval: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Blogs;
