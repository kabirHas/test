import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBars,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const routes = [
  {
    path: "/",
    name: "Dashboards",
    icon: <FontAwesomeIcon icon={faGauge} />,
    subicon: <FontAwesomeIcon icon={faAngleDown} />,
    children: [
      {
        path: "leads",
        name: "Analytics",
      },
      {
        path: "leads",
        name: "CRM",
      },
      {
        path: "leads",
        name: "Ecommerce",
      },
      {
        path: "leads",
        name: "Crypto",
      },
      {
        path: "leads",
        name: "Projects",
      },
      {
        path: "leads",
        name: "NFT",
      },
      {
        path: "leads",
        name: "JOB",
      },
    ],
  },
  {
    path: "/apps",
    name: "Apps",
    icon: <FontAwesomeIcon icon={faBars} />,
    subicon: <FontAwesomeIcon icon={faAngleDown} />,
    children: [
      {
        path: "/leads",
        name: "Calendar",
      },
      {
        path: "/leads",
        name: "Chat",
      },
      {
        path: "/leads",
        name: "Email",
      },
      {
        path: "/leads",
        name: "Ecommerce",
      },
      {
        path: "/leads",
        name: "Projects",
      },
      {
        path: "/leads",
        name: "Tasks",
      },
      {
        path: "/crm",
        name: "CRM",
        subicon: <FontAwesomeIcon icon={faAngleDown} />,
        children: [
          {
            path: "leads",
            name: "Companies",
          },
          {
            path: "leads",
            name: "Deals",
          },
          {
            path: "leads",
            name: "Leads",
          },
        ],
      },
      {
        path: "test",
        name: "Test",
      },
    ],
  },
];

const Nav = () => {
  const [activeLink, setActiveLink] = React.useState("#");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };


  const handleLinkClicks = (link) => {
    setActiveLink(link);
    
  };


  const handleParentClick = (event) => {
    const ulElement = event.target.nextElementSibling; // Get the next sibling element
    if (ulElement && ulElement.tagName === 'ul') {
      ulElement.classList.toggle('active'); // Toggle the 'active' class on the UL element
    }
  };
 


  const renderLink = (route, index) => {
    return (
      <div
        key={index}
        className={`sidebar-item ${activeLink === route.path ? "active" : ""}`}
        onClick={() => handleLinkClick(route.path)}
      >
        <Link to={route.path} className="link">
          {/* <i className={route.icon}></i> */}
          <span>{route.name}</span>
        </Link>
      </div>
    );
  };

  const renderRoutes = (routes, parentPath) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <div key={index} className="sidebar-submenu" onClick={handleParentClick}>
            <div
              key={index}
                 className={`sidebar-item parent ${
                activeLink === route.path ? "active" : ""
              }`}
              onClick={() => handleLinkClicks(route.path)}
            >
              <span className="sidebar-submenu-title">
                <div className="befores">
                  {route.icon ? (
                    <span className="icon-z"> {route.icon}</span>
                  ) : null}
                  <span>{route.name}</span>
                </div>
                <span className="sub-icon">{route.subicon}</span>
              </span>
            </div>
           
            <ul className="sidebar-submenu-list">
              {renderRoutes(route.children, `${parentPath}${route.path}`)}
            </ul>
           
          </div>
        );
      }

      return renderLink(route, index, parentPath);
    });
  };

  return (
    <nav className="sidebar">
      <ul className="navbar">{renderRoutes(routes, "")}</ul>
    </nav>
  );
};

export default Nav;






