import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import newsletterTemplatesService from "../../services/newsletterTemplatesService";
import toastr from "toastr";
import debug from "sabio-debug";
import NewsletterTemplateCard from "./NewsletterTemplateCard";

const _logger = debug.extend("NewsletterTemplateList");
function NewsletterTemplatesList() {
  const [templates, setTemplates] = useState({
    templatesList: null,
    templatesListComponents: null,
  });

  _logger(templates);

  useEffect(() => {
    newsletterTemplatesService
      .getPaged()
      .then(onGetTemplatesSuccess)
      .catch(onGetTemplatesError);
  }, []);

  const onGetTemplatesSuccess = (response) => {
    let arrayOfTemplates = response.item.pagedItems;

    _logger(arrayOfTemplates);

    setTemplates((prevState) => {
      const templateData = { ...prevState };
      templateData.templatesList = arrayOfTemplates;
      templateData.templatesListComponents =
        arrayOfTemplates.map(mapTemplateList);
      return templateData;
    });
  };

  const onGetTemplatesError = (response) => {
    _logger(response);
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const mapTemplateList = (aTemplate) => {
    return (
      <NewsletterTemplateCard
        template={aTemplate}
        key={aTemplate.id}
      ></NewsletterTemplateCard>
    );
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        {templates.templatesListComponents}
      </div>
    </React.Fragment>
  );
}

export default NewsletterTemplatesList;
