import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { NavLink } from "react-router";
import * as React from "react";

import classnames from "classnames/bind";
import * as style from "./style.scss";

const cx = classnames.bind(style);

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Box className={cx("navbar-container")}>
            <NavLink to="/" className={(isActive) => cx("navlink", isActive)}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </NavLink>
            <NavLink
              to="/shadow"
              className={(isActive) => cx("navlink", isActive)}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shadow
              </Typography>
            </NavLink>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
