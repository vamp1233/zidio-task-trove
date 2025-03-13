
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box, 
  useMediaQuery, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard, 
  FolderOpen, 
  People, 
  ExitToApp,
  Person,
  Settings,
  Notifications
} from '@mui/icons-material';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:800px)');
  
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { title: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { title: 'Projects', path: '/projects', icon: <FolderOpen /> },
    { title: 'Team', path: '/team', icon: <People /> },
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Zidio Task Trove</Typography>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            key={link.title} 
            component={Link} 
            to={link.path}
            selected={isActive(link.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }
            }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!currentUser) return null;

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/dashboard" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Zidio Task Trove
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3, ml: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive(link.path) ? 600 : 500,
                  position: 'relative',
                  '&::after': isActive(link.path) ? {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    bottom: '0',
                    left: 0,
                    backgroundColor: 'primary.main',
                    borderRadius: '2px'
                  } : {}
                }}
                startIcon={link.icon}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
              <Avatar
                alt={currentUser?.name || "User"}
                src={currentUser?.avatar}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem 
                sx={{ 
                  minWidth: '200px',
                  py: 1.5,
                  px: 2
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {currentUser?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.role === 'admin' ? 'Administrator' : 'Team Member'}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to="/profile">
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/settings">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
