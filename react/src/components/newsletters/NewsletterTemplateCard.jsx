import React from "react";
import propTypes from "prop-types";
import debug from "sabio-debug";
import "./newslettertemplatestyle.css";

const _logger = debug.extend("NewsletterTemplateCard");

function NewsletterTemplateCard(props) {
  let template = props.template;

  _logger(template);

  return (
    <div className="col-3 newsletter-template">
      <div>
        <img
          src={template.primaryImage}
          className="card-img-top newsletter-template-image"
          alt="Newsletter Template"
        />
        <div className="card-body">
          <h4 className="card-title">{template.name}</h4>
          <div></div>
        </div>
        <div>
          <a href="">Edit This Template</a>
        </div>
      </div>
    </div>
  );
}

NewsletterTemplateCard.propTypes = {
  template: propTypes.shape({
    content: propTypes.string.isRequired,
    createdBy: propTypes.number.isRequired,
    modifiedBy: propTypes.number,
    dateCreated: propTypes.string.isRequired,
    dateModified: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    primaryImage: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }),
};
export default NewsletterTemplateCard;
