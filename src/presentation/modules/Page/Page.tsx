import React, { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Icon,
  Container,
  Hidden,
} from '@material-ui/core';
import { useToggle } from 'presentation/hooks';
import { enhance } from 'presentation/hocs';

interface Props {
  options?: ReactNode,
  children: NonNullable<ReactNode>,
}

const Page = ({ options, children }: Props) => {
  const [ showMenu, toggleMenu, , closeMenu ] = useToggle();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
      <AppBar
        position="static"
        style={{
          marginBottom: 16,
        }}
      >
        <Toolbar>
          {options && (
            <Hidden mdUp>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleMenu}
              >
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
          )}
          <Typography variant="h6">
            Title
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        {options && (
          <>
            <Hidden smDown>
              <Drawer
                anchor="left"
                variant="permanent"
                open={true}
                PaperProps={{
                  style: {
                    position: 'static',
                    width: 300,
                  },
                }}
                onClose={closeMenu}
              >
                {options}
              </Drawer>
            </Hidden>
            <Hidden mdUp>
              <Drawer
                anchor="top"
                variant="persistent"
                open={showMenu}
                PaperProps={{
                  style: {
                    width: '100%',
                    top: 48,
                  },
                }}
                transitionDuration={0}
                onClose={closeMenu}
              >
                {options}
              </Drawer>
            </Hidden>
          </>
        )}
        <Container>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default enhance('Page')(Page);
