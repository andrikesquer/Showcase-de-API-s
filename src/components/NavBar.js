"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            color="inherit"
            onClick={() => (window.location.href = "/login")}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
                <Link href="/" passHref>
                  Home
                </Link>
              </MenuItem>
        <MenuItem onClick={handleClose}>
                  <Link href="/login" passHref>
                    Login
                  </Link>
                </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/trivia" passHref>
            Video game trivia
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/countries" passHref>
            Random countries
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/catFacts" passHref>
            Cat Facts
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
