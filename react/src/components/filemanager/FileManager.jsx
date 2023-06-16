import { React } from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import UsersTypeAheadFilter from "./UsersTypeAheadFilter";
import Files from "./Files";

function FileManager(props) {
  const roles = props.currentUser.roles.toString();

  const adminRole = () => {
    if (roles === "SysAdmin")
      return <UsersTypeAheadFilter currentUser={props.currentUser} />;
    else return <Files currentUser={props.currentUser} />;
  };

  return (
    <div id="content" className="site-content" tabIndex={-1}>
      <div id="primary" className="content-area">
        <main id="main" className="site-main">
          <article
            id="post-1279"
            className="post-1279 page type-page status-publish hentry"
          >
            <div className="page__content pb-10 img-rounded-enabled">
              <div className="container">
                <div className="prose">
                  <div className="woocommerce">
                    <div className="pt-5 pb-5">
                      <div className="row mt-0 mt-md-4">
                        <div className="geeks__account-sidebar col-lg-3 col-md-4 col-12">
                          <aside className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav">
                            <a
                              className="d-xl-none d-lg-none d-md-none text-inherit fw-bold"
                              href="#"
                            >
                              Menu
                            </a>
                            <button
                              className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary text-light"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#sidenav"
                              aria-controls="sidenav"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                            >
                              <span className="fe fe-menu" />
                            </button>
                            <div
                              className="collapse navbar-collapse"
                              id="sidenav"
                            >
                              <div className="navbar-nav flex-column">
                                <button className="form-control w-100 btn btn-success">
                                  + Create New{" "}
                                </button>
                                <ul className="woocommerce-MyAccount-navigation-tab list-unstyled ms-n2 mb-0">
                                  <li className=" tutor-dashboard-menu-divider-header"></li>
                                  <li className="nav-item woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--index pt-2">
                                    <Nav.Item>
                                      <Nav.Link href="" className="nav-link">
                                        <i className="fe fe-folder nav-icon"></i>
                                        My Files{" "}
                                      </Nav.Link>
                                    </Nav.Item>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </aside>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                          <div className="woocommerce-notices-wrapper" />
                          <div className="tutor-dashboard-content-inner">
                            <div className="tutor-dashboard-inline-links">
                              <div className="row">
                                <div className="col-lg-9 col-md-8 col-12"></div>
                              </div>
                              <div className="tutor-dashboard-content-inner card">
                                <div className="card-body">
                                  <div
                                    id="tutor_profile_cover_photo_editor"
                                    className="pop-up-opened5 d-lg-flex align-items-center justify-content-between"
                                  >
                                    {adminRole()}
                                    <input
                                      id="tutor_photo_dialogue_box"
                                      className="d-none"
                                      type="file"
                                      accept=".png,.jpg,.jpeg"
                                    />
                                    <div className="d-md-flex align-items-center mb-4 mb-lg-0">
                                      <div className="drive-item module text-center">
                                        <div className="drive-item-inner module-inner">
                                          <div className="drive-item-title"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr className="my-5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>{" "}
        </main>
      </div>
    </div>
  );
}

FileManager.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
export default FileManager;