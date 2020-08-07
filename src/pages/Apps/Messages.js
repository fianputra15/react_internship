import { Message, Wrapper } from '../../components';
import React, { Fragment, useState } from 'react';
import {
  mockFolders,
  mockFolders2,
  mockMessages,
  mockTags
} from '../../utils/mock';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { drawerWidth } from '../../styleVariables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 100
  },
  toolBar: {
    paddingLeft: theme.spacing(1) / 2,
    paddingRight: theme.spacing(1) / 2
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxWidth: drawerWidth,
    zIndex: theme.zIndex.drawer + 3,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent'
    },
    [theme.breakpoints.down('sm')]: {
      top: '0',
      height: 'calc(100vh - 56px)'
    },
    border: 0,
    height: 'auto'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    minWidth: 0
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    },
    zIndex: '1000'
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  }
}));

const Messages = () => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleDrawerToggle = () => setOpened(!opened);

  const menu = (
    <Fragment>
      <List>{mockFolders}</List>
      <Divider />
      <List>{mockFolders2}</List>
      <Divider />
      <List>{mockTags}</List>
    </Fragment>
  );

  return (
    <Wrapper padding={false}>
      <Hidden mdUp>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleDrawerToggle()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Messages
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <div className={classes.root}>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            ModalProps={{
              keepMounted: false,
              className: classes.modal,
              BackdropProps: {
                className: classes.backdrop
              },
              onBackdropClick: handleDrawerToggle
            }}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {menu}
          </Drawer>
        </Hidden>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={opened}
            ModalProps={{
              keepMounted: false,
              className: classes.modal,
              BackdropProps: {
                className: classes.backdrop
              },
              onBackdropClick: handleDrawerToggle
            }}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {menu}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <Message messages={mockMessages} />
        </main>
      </div>
    </Wrapper>
  );
};

export default Messages;
