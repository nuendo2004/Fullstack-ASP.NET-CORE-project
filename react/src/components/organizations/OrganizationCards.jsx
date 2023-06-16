import React from "react";
import "../organizations/organizationList.css";
import Geeksui1 from "assets/images/about/geeksui-img-1.jpg";
import Geeksui2 from "assets/images/about/geeksui-img-2.jpg";
import Geeksui4 from "assets/images/about/geeksui-img-4.jpg";
import Geeksui3 from "assets/images/about/geeksui-img-3.jpg";
import Geeksui5 from "assets/images/about/geeksui-img-5.jpg";
import Geeksui6 from "assets/images/about/geeksui-img-6.jpg";

function OrganizationList() {
  return (
    <div className="container">
      <h2> Active Users </h2>
      <h3> </h3>
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui4} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title"> Learning Institutions</h5>
              <p className="card-text">Students and schools</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui5} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title"> DOD </h5>
              <p className="card-text">Government agencies under contract</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui2} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title"> Contractors </h5>
              <p className="card-text">Companies and employees</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3> Inactive users </h3>
      <div className="row mb-5 cstm-height-card">
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui1} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title">International Companies</h5>
              <p className="card-text">Foreign companies and employees</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui3} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title"> Charities</h5>
              <p className="card-text">Names of charities and volunteers</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={Geeksui6} alt="" className="w-100" />
            <div className="card-body">
              <h5 className="card-title"> Individual Accounts</h5>
              <p className="card-text">Indepentdent users</p>
              <a href="#" className="btn btn-sm btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationList;
