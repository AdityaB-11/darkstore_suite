import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box,
  Button,
  Avatar,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { dashboardModules } from './Dashboard';

const drawerWidth = 240;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function Layout() {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dark Store GenAI Suite
          </Typography>
          {user && (
            <>
              <Button color="inherit">
                <Avatar alt={user.email} src={user.photoURL} />
              </Button>
              {!isMobile && (
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Welcome, {user.email}
                </Typography>
              )}
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: 'none',
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <StyledListItem button component={Link} to="/">
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
            {dashboardModules.map((module) => (
              <StyledListItem button key={module.name} component={Link} to={module.path}>
                <ListItemIcon>
                  {React.cloneElement(module.icon, { color: "primary" })}
                </ListItemIcon>
                <ListItemText primary={module.name} />
              </StyledListItem>
            ))}
            <StyledListItem button onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
