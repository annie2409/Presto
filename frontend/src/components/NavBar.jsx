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
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useMutation } from 'react-query';
import { logout } from '../apis/auth';
import { loginPage } from '../utils/routes';

const NavBar = () => {
  const { user, updateUser } = useAuthContext();
  const navigation = useNavigate();

  const [anchorNav, setAnchorNav] = useState(null);

  const openMenu = (e) => {
    setAnchorNav(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: () => {
      updateUser(null);
      navigation(loginPage);
    },
    onError: (data) => {
      alert(data.message);
      // TODO: change this to show an error pop up
    },
  });

  const handleLogout = () => {
    mutate(user.token);
  };

  return (
    <AppBar position="static">
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
          <Button
            color="inherit"
            sx={{ color: 'white' }}
            disabled={isLoading}
            onClick={handleLogout}
          >
            Logout
          </Button>
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
                <Button
                  disabled={isLoading}
                  color="inherit"
                  sx={{ color: 'navy' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
