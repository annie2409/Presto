import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navBarPages } from '../App';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorNav, setAnchorNav] = useState(null);

  const openMenu = (e) => {
    setAnchorNav(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          Presto
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navBarPages.map((navBarPage) => (
            <Link key={navBarPage.text} to={navBarPage.to}>
              <Button color="inherit" sx={{ color: 'white' }}>
                {navBarPage.text}
              </Button>
            </Link>
          ))}
          <Link to="/">
            <Button color="inherit" sx={{ color: 'white' }}>
              Logout
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuList>
              {navBarPages.map((navBarPage) => (
                <MenuItem key={navBarPage.text}>
                  <Link to={navBarPage.to}>
                    <Button color="inherit" sx={{ color: 'navy' }}>
                      {navBarPage.text}
                    </Button>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Link to="/">
                  <Button color="inherit" sx={{ color: 'navy' }}>
                    Logout
                  </Button>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
