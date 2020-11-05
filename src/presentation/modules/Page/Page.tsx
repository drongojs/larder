import React, { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Container,
  Hidden,
} from '@material-ui/core';
import { enhance } from 'presentation/hocs';

interface Props {
  options?: ReactNode,
  children: NonNullable<ReactNode>,
}

const Page = ({ options, children }: Props) => {
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
