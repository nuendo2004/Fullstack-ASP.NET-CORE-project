import React from "react";
import PropTypes from "prop-types";
import { Card, Table, ProgressBar } from "react-bootstrap";
import Icon from "@mdi/react";
import SocialMediaTrafficData from "components/dashboard/analytics/data/SocialMediaTrafficData";

const SocialMediaTraffic = ({ title }) => {
  return (
    <Card className="h-100 ">
      <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title} </h4>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table className="mb-0 text-nowrap">
            <tbody>
              {SocialMediaTrafficData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className=" border-top-0">
                      <Icon
                        path={item.icon}
                        size={0.6}
                        className="text-primary"
                      />
                      <span className="ms-2 d-none d-md-inline-block">
                        {item.media}
                      </span>
                    </td>
                    <td className="text-end border-top-0">
                      <span>{item.counter}</span> <span>({item.percent}%)</span>
                    </td>
                    <td className="w-25 ps-3 align-middle border-top-0 ">
                      <ProgressBar
                        variant={item.progressbarvariant}
                        now={item.percent}
                        className="mb-2"
                        style={{ height: "5px" }}
                      />
                    </td>
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
SocialMediaTraffic.propTypes = {
  title: PropTypes.string,
};
export default SocialMediaTraffic;
