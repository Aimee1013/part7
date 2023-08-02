import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* <Link to={"/"}>blogs</Link> <Link to={"/users"}>users</Link> */}
      <AppBar position="static" style={{ background: "BurlyWood" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"></IconButton>
          <Button style={{ background: "#2E3B55" }}>
            <Link to={"/"}>blogs</Link>
          </Button>
          <Button style={{ background: "#2E3B55" }}>
            <Link to={"/users"}>users</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
