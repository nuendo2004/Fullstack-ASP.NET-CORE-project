import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import PageStatistics from "components/dashboard/analytics/data/PageStatistics";

const MostViewPages = ({ title }) => {
  return (
    <Card className="h-100">
      <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table className="mb-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col" className="">
                  Page
                </th>
                <th scope="col" className="text-end ">
                  Exits
                </th>
                <th scope="col" className="text-end ">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {PageStatistics.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.link}{" "}
                      <Link to="#" className="text-inherit">
                        <i className="fe fe-external-link"></i>
                      </Link>
                    </td>
                    <td className=" text-end">{item.exits}</td>
                    <td className=" text-end ">{item.views}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};
MostViewPages.propTypes = {
  title: PropTypes.string,
};
export default MostViewPages;
