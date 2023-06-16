import React from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch";
import "./blogs.css"

const BlogCard = (props) => {
    const { blog, changeApproval } = props;

    const changeApprovalStatus = () => {
        changeApproval(blog.id, !blog.isApproved);
      };
   
    return ( 
             <div key={blog.id}>
                    <div className="blog-card">
                                <h5 className="blog-approv-text"> {blog.isApproved ? "Approved Blog " : "Disapproved Blog"}</h5>
                                <div className="card-body">
                                <div id={blog.isApproved} />
                                    <h1 className="blog-card-title">{blog.title}</h1>
                                    <img className="blogcard-img-top" src={blog.imageUrl} aria-hidden alt="Blog Picture"/>
                                    <h4 className="blogcard-subject">{blog.subject}</h4>
                                    <p className="blogcard-content">{blog.content}</p>
                                    <p className="status">{blog.isApproved}</p> 
                                    <div className="container-toggle">
                                    <ToggleSwitch
                                      toggleHandler={changeApprovalStatus}
                                      isApproved={blog.isApproved}
                                      id={blog.id}/>
                                </div>
                    </div>    
                </div>    
            </div>    
    );
};

BlogCard.propTypes = {
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

  export default BlogCard;
