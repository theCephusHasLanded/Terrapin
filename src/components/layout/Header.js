import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { items } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Shop', path: '/shop' },
    { text: 'Collection', path: '/collection' },
    { text: 'About', path: '/about' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h6" component="div">
          TERRAPIN
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                py: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            letterSpacing: 1,
            color: 'primary.main',
            textDecoration: 'none',
            flexGrow: isMobile ? 1 : 0,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          TERRAPIN
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', mx: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                color="inherit"
                sx={{ mx: 1 }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box>
          <IconButton color="inherit" aria-label="account">
            <PersonIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            aria-label="cart"
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;