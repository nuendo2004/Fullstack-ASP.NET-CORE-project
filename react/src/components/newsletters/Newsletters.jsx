import React from "react";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import { useState, useEffect } from "react";
import newsletterService from "services/newsletterService";
import NewsletterCard from "./NewsletterCard";
import { FaSearch } from "react-icons/fa";
import toastr from "toastr";
import "./newsletterstyle.css";
import debug from "sabio-debug";

const _logger = debug.extend("Newsletter");

function Newsletters() {
  const [pageData, setPageData] = useState({
    arrayOfNewsletters: [],
    newsletterComponents: [],
    searchQuery: "",
    totalCount: 0,
    current: 1,
    pageIndex: 0,
    pageSize: 3,
    show: false,
  });

  _logger(pageData);

  useEffect(() => {
    if (pageData.searchQuery) {
      newsletterService
        .getSearch(pageData.pageIndex, pageData.pageSize, pageData.searchQuery)
        .then(onGetNewsletterSuccess)
        .catch(onGetNewsletterError);
    } else {
      newsletterService
        .getPaged(pageData.pageIndex, pageData.pageSize)
        .then(onGetNewsletterSuccess)
        .catch(onGetNewsletterError);
    }
  }, [pageData.pageIndex, pageData.show]);

  const onGetNewsletterSuccess = (data) => {
    let arrayOfNewsletterCovers = data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfNewsletters = arrayOfNewsletterCovers;
      pd.totalCount = data.item.totalCount;
      pd.newsletterComponents = arrayOfNewsletterCovers.map(mapNewsletterCard);

      return pd;
    });
  };

  const onGetNewsletterError = () => {
    toastr.error("Error: Could not fetch Newsletters");
  };

  const onSearchNewsletterSuccess = (data) => {
    let arrayOfNewsletterCovers = data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfNewsletters = arrayOfNewsletterCovers;
      pd.totalCount = data.item.totalCount;
      pd.newsletterComponents = arrayOfNewsletterCovers.map(mapNewsletterCard);

      return pd;
    });
  };

  const onSearchNewsletterError = () => {
    toastr.error("Error: searched newsletter(s) does not exist");
  };

  const mapNewsletterCard = (aNewsletter) => {
    return (
      <NewsletterCard
        newsletter={aNewsletter}
        key={"ListA-" + aNewsletter.id}
      />
    );
  };

  const handlePaginate = (page) => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  const onSearchClicked = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = 0;
      return pd;
    });
    newsletterService
      .getSearch(pageData.pageIndex, pageData.pageSize, pageData.searchQuery)
      .then(onSearchNewsletterSuccess)
      .catch(onSearchNewsletterError);
  };

  const onSearchFieldChange = (event) => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.searchQuery = event.target.value;
      return pd;
    });
  };

  const onSearchReset = () => {
    setPageData((prevState) => {
      let clear = { ...prevState };
      clear.searchQuery = "";
      clear.pageIndex = 0;
      clear.show = !clear.show;
      return clear;
    });
  };

  return (
    <>
      <div className="container bg-colors-gradient p-5">
        <div>
          <h1 className=" ds-section-headline fw-bold mb-3 col-12">
            <span className="text-primary">Newsletters</span>
            <p className="  ">
              Sign up to get the latest news on Cyber Security!
            </p>
          </h1>
        </div>
        <form onSubmit={onSearchClicked}>
          <div
            className="custom-search justify-content-center 
          d-sm-flex p-3 m-3"
          >
            <div className="search-wrapper">
              <div className="search-icon fa-lg pr-4">
                <FaSearch id="search-icon" color="blueviolet" size={28} />
              </div>
              <input
                className="form-control-lg newsletter-search-input fs-3 bg-transparent border-0 w-100 mx-3"
                id="searchQuery"
                type="text"
                name="searchQuery"
                placeholder="Type to search..."
                value={pageData.searchQuery}
                onChange={onSearchFieldChange}
              ></input>
            </div>
            <button
              type="button"
              className="btn btn-primary ml-2"
              size="md"
              onClick={onSearchClicked}
            >
              Search
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2 mx-2"
              size="md"
              onClick={onSearchReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="pag-container">
          <Pagination
            className="pagination justify-content-center"
            locale={locale}
            current={pageData.pageIndex + 1}
            pageSize={pageData.pageSize}
            total={pageData.totalCount}
            onChange={handlePaginate}
            prevIcon={
              <span className="page-link shadow-lg btn btn-primary">Prev</span>
            }
            nextIcon={
              <span className="page-link shadow-lg btn btn-primary">Next</span>
            }
          />
        </div>
        <div className="row justify-content-center">
          {pageData.newsletterComponents}
        </div>
      </div>
    </>
  );
}

export default Newsletters;
