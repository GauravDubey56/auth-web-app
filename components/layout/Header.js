import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { getLocalKey } from "@/utils/localstore";
export default function Header() {
  const loggedIn = getLocalKey("token");
  const TITLE = "AuthStack";

  return (
    <Box sx={{ flexGrow: 1 }} width="100%">
      <AppBar position="static">
        <Toolbar>
          {loggedIn ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {TITLE}
          </Typography>
          {!loggedIn ? (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Signup</Button>
            </>
          ) : (
            <Button color="inherit">Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
