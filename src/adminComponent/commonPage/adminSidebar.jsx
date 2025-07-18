import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../authPage/contex";

const AdminSideBar = () => {
  const [collapseStates, setCollapseStates] = useState({
    dashboard: false,
    base: false,
    sidebarLayouts: false,
    forms: false,
    tables: false,
    maps: false,
    charts: false,
    submenu: false,
  });

  const toggleCollapse = (section) => {
    setCollapseStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
   const { userData  , statusData} = useAuth();


   
  // If admin_name is "manish", render only the limited sidebar
  if (userData === "manish@gmail.com") {
    return (
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li className="nav-item">
                <NavLink
                  to="/admin/apply-form-data"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="fas fa-file-alt"></i>
                  <p>User Apply Form</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }


  // If admin_name is "manish", render only the limited sidebar
  if (statusData == "2") {
    return (
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
             <li class="nav-item">
                <NavLink
                  to="/admin/partner"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-handshake"></i>

                  <p>Partner's Data </p>
                </NavLink>
              </li>
                <li class="nav-item">
                <NavLink
                  to="/admin/apply-form-data"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-file-alt"></i>

                  <p>User Apply Form </p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
   



  return (
    <>
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          <div className="logo-header" data-background-color="dark">
            <NavLink to="/admin" className="logo">
              <img
                src="/assets/img/kaiadmin/logo_light.svg"
                alt="navbar brand"
                className="navbar-brand"
                height="20"
              />
            </NavLink>
            <div className="nav-toggle">
              <button className="btn btn-toggle toggle-sidebar">
                <i className="gg-menu-right"></i>
              </button>
              <button className="btn btn-toggle sidenav-toggler">
                <i className="gg-menu-left"></i>
              </button>
            </div>
            <button className="topbar-toggler more">
              <i className="gg-more-vertical-alt"></i>
            </button>
          </div>
          {/* End Logo Header */}
        </div>
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li className="nav-item">
                <a
                  onClick={() => toggleCollapse("dashboard")}
                  aria-expanded={collapseStates.dashboard}
                  className={collapseStates.dashboard ? "" : "collapsed"}
                >
                  <i className="fas fa-home"></i>
                  <p>Dashboard</p>
                  <span className="caret"></span>
                </a>
                <div
                  className={`collapse ${
                    collapseStates.dashboard ? "show" : ""
                  }`}
                  id="dashboard"
                >
                  <ul className="nav nav-collapse">
                    <li>
                      <NavLink
                        to="/admin/dashboard"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Dashboard 1</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
                <h4 className="text-section">Components</h4>
              </li>

              <li className="nav-item">
                <a
                  onClick={() => toggleCollapse("base")}
                  aria-expanded={collapseStates.base}
                  className={collapseStates.base ? "" : "collapsed"}
                >
                  <i className="fas fa-layer-group"></i>
                  <p>Setting</p>
                  <span className="caret"></span>
                </a>
                <div
                  className={`collapse ${collapseStates.base ? "show" : ""}`}
                  id="base"
                >
                  <ul className="nav nav-collapse">
                    <li>
                      <NavLink
                        to="/admin/setting/site"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Site</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/setting/social_media"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Social Media</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/setting/banner"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Banner Setting</span>
                      </NavLink>
                    </li>
                    
                    <li>
                      <NavLink
                        to="/admin/setting/services"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Services Setting</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  onClick={() => toggleCollapse("sidebarLayouts")}
                  aria-expanded={collapseStates.sidebarLayouts}
                  className={collapseStates.sidebarLayouts ? "" : "collapsed"}
                >
                  <i className="fas fa-th-list"></i>
                  <p>CMS</p>
                  <span className="caret"></span>
                </a>
                <div
                  className={`collapse ${
                    collapseStates.sidebarLayouts ? "show" : ""
                  }`}
                  id="sidebarLayouts"
                >
                  <ul className="nav nav-collapse">
                    <li>
                      <NavLink
                        to="/admin/setting/contact-data"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">
                          Contact Data Management{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/setting/contact-form"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">
                          Contact Form Management{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/setting/footer"
                        activeClassName="active"
                        className="nav-link"
                      >
                        <span className="sub-item">Footer Management </span>
                      </NavLink>
                    </li>
                   
                  </ul>
                </div>
              </li>
              {/* Repeat for other collapsible sections */}

              <li class="nav-item">
                <NavLink
                  to="/admin/setting/services"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-cogs"></i>

                  <p>Services Setting</p>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/admin/setting/projects"
                  activeClassName="active"
                  className="nav-link"
                >
                 <i class="fas fa-project-diagram"></i>

                  <p>Projects Setting</p>
                 
                </NavLink>
              </li>
           
             <li class="nav-item">
                <NavLink
                  to="/admin/apply-form-data"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-file-alt"></i>

                  <p>User Apply Form </p>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/admin/partner"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-handshake"></i>

                  <p>Partner's Data </p>
                </NavLink>
              </li>
                <li class="nav-item">
                <NavLink
                  to="/admin/loanProduct"
                  activeClassName="active"
                  className="nav-link"
                >
            <i class="fas fa-piggy-bank"></i>

                  <p>Loan Product's Data </p>
                </NavLink>
              </li>
               <li class="nav-item">
                <NavLink
                  to="/admin/paymentRequest"
                  activeClassName="active"
                  className="nav-link"
                >
               <i class="fas fa-credit-card"></i>

                  <p>Handle Payment Request </p>
                </NavLink>
              </li>
                <li class="nav-item">
                <NavLink
                  to="admin/setting/ourTeam"
                  activeClassName="active"
                  className="nav-link"
                >
                <i class="fas fa-headset"></i>

                  <p> SUPPORT TEAM </p>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="admin/httpLinkData"
                  activeClassName="active"
                  className="nav-link"
                >
                <i class="fas fa-headset"></i>

                  <p>Http Link Data </p>
                </NavLink>
              </li>

                <li class="nav-item">
                <NavLink
                  to="/admin/viewDelarData"
                  activeClassName="active"
                  className="nav-link"
                >
                <i class="fas fa-headset"></i>

                  <p>View Delar </p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
