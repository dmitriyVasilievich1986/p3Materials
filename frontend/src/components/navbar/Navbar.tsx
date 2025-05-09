import * as React from "react";
import * as style from "./style.scss";

import { Flex, Typography } from "antd";

import { NavLink } from "react-router";
import { PagesUrls } from "../../constants";

import classnames from "classnames/bind";

const cx = classnames.bind(style);

function Navbar() {
  return (
    <Flex className={cx("navbar-container")} justify="center">
      <Flex
        className={cx("navbar-wrapper")}
        justify="start"
        align="center"
        gap="large"
      >
        {Object.values(PagesUrls)
          .filter((p) => !!p.isNavigation)
          .map((p) => (
            <NavLink
              to={p.url}
              key={p.name}
              className={(isActive) => cx("navbar-link", isActive)}
            >
              <Typography.Title level={4} style={{ color: "inherit" }}>
                {p.label}
              </Typography.Title>
            </NavLink>
          ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
