import React from "react";
import HeaderBreadcrumb from "../HeaderBreadcrumb";
import AllFAQsList from "./AllFAQsList";

function HelpCenterFAQ() {
  const breadcrumb = [
    {
      page: "FAQS",
      link: "/marketing/help/faq",
    },
  ];

  return (
    <React.Fragment>
      <HeaderBreadcrumb
        title="Frequently Asked Questions"
        breadcrumb={breadcrumb}
      />
      <AllFAQsList />
    </React.Fragment>
  );
}
export default HelpCenterFAQ;
