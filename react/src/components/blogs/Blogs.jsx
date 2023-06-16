import React from "react";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import blogService from "../../services/blogService";
import { Button } from "react-bootstrap";
import "../blogs/blogs.css";
import toastr from "toastr";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BlogsViewer from "./BlogsViewer";
const _logger = debug.extend("BlogList");

export default function Blogs(props) {
  const navigate = useNavigate();
  const [blogsData, setBlogData] = useState({
    pageIndex: 0,
    pageSize: 3,
    totalCount: 0,
    totalPages: 0,
    pagedItems: [],
    isApproved: true,
    arrayofBlogs: [],
    isPublished: false,
    isDeleted: true,
  });

  const mapBlog = (aBlog) => {
    return (
      <BlogCard
        blog={aBlog}
        key={"List-A" + aBlog.id}
        currentUser={props.currentUser}
      />
    );
  };

  const aBlog = props.blog;

  useEffect(() => {
    blogService
      .getAllBlogs(
        blogsData.pageIndex,
        blogsData.pageSize,
        blogsData.isApproved,
        blogsData.isPublished,
        blogsData.isDeleted
      )
      .then(onGetBlogsSuccess)
      .catch(onGetBlogsError);
  }, [blogsData.pageIndex]);
  _logger("blogdata size and index", blogsData.pageIndex, blogsData.pageSize);

  const onGetBlogsSuccess = (data) => {
    _logger(data);
    let listOfBlogs = data.item.pagedItems;

    setBlogData((prevState) => {
      const pageData = { ...prevState };
      pageData.pagedItems = listOfBlogs;
      pageData.arrayofBlogs = listOfBlogs.map(mapBlog);
      pageData.totalCount = data.item.totalCount;
      pageData.pageIndex = data.item.pageIndex;
      pageData.pageSize = data.item.pageSize;
      pageData.totalPages = data.item.totalPages;

      return pageData;
    });
  };
  const onGetBlogsError = () => {
    toastr("Blogs error");
  };

  const onPageChange = (page) => {
    setBlogData((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageIndex = page - 1;
      return newPageData;
    });
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    navigate(`/blogs/add`, {
      state: { aBlog },
    });
  };

  return (
    <div className="pb-5 bg-white">
      <BlogsViewer />
      <div className="container d-flex flex-column">
        <Button
          variant="outline-primary"
          className="blogs-create-button"
          onClick={handleCreateClick}
        >
          Create a Blog
        </Button>
        <Pagination
          onChange={onPageChange}
          current={blogsData.pageIndex + 1}
          pageSize={blogsData.pageSize}
          total={blogsData.totalCount}
          locale={locale}
        />

        <div className="row pt-5"> {blogsData.arrayofBlogs}</div>
      </div>
    </div>
  );
}

Blogs.propTypes = {
  blog: PropTypes.shape({}),
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
