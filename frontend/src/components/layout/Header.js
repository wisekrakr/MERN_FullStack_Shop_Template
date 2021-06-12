import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Navbar className="sticky-top" color="light" light expand="md">
      <NavbarBrand href="/" className="navbar-brand mr-auto">
        <img src="/assets/images/logo.png" alt="#" /> Your Web Shop
      </NavbarBrand>

      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink
              href="/orders"
              className="inactive"
              activeClassName="active"
            >
              <i className="fa fa-truck"></i>Current Orders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/history"
              className="inactive"
              activeClassName="active"
            >
              <i className="fa fa-history" aria-hidden="true"></i>History
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/login"
              className="inactive"
              activeClassName="active"
            >
              <i className="fa fa-plug" aria-hidden="true"></i>Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cart" className="inactive" activeClassName="active">
              <span>
                <i className="fa fa-shopping-cart "></i>Cart
              </span>
              <span className="ml-1" id="cart-count">
                2
              </span>
            </NavLink>
          </NavItem>

          {/* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Your Profile
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-user" aria-hidden="true"></i>Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comment" aria-hidden="true"></i>Reviews
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fas fa-power-off" aria-hidden="true" /> Logout{" "}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
