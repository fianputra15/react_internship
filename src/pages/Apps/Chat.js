import React, { useState } from "react";
import { mockChats, mockContacts } from "../../utils/mock";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Wrapper } from "../../components";
import classNames from "classnames";
import { drawerWidth } from "../../styleVariables";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    overflow: "hidden",
    position: "relative"
  },
  header: {
    marginTop: "-72px",
    padding: "8px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
    boxShadow: "0 1px 8px rgba(0,0,0,.3)"
  },
  toolBar: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1) / 2,
      paddingRight: theme.spacing(1) / 2
    }
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    maxWidth: drawerWidth,
    overflow: "auto",
    height: "100%"
  },
  modal: {
    [theme.breakpoints.down("sm")]: {
      top: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      top: "64px"
    },
    zIndex: "1000"
  },
  backdrop: {
    [theme.breakpoints.down("sm")]: {
      top: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      top: "64px"
    }
  },
  headerLeft: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      maxWidth: drawerWidth
    },
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth / 2,
      maxWidth: drawerWidth / 2
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "-40px"
    },
    display: "flex",
    alignItems: "center",
    overflow: "auto",
    height: "100%"
  },
  wrapper: {
    width: "100%",
    height: "calc(100vh - 208px)",
    zIndex: 1,
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxWidth: "100%",
    flexDirection: "row"
  },
  main: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    minWidth: 0,
    height: "calc(100% - 75px)",
    boxSizing: "border-box",
    flex: 1,
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto"
  },
  conversation: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: theme.spacing(1) * 2,
    [theme.breakpoints.down("sm")]: {
      padding: `0 ${theme.spacing(1) * 1}px`
    },
    [theme.breakpoints.up("sm")]: {
      padding: `0 ${theme.spacing(1) * 3}px`
    },
    display: "flex"
  },
  conversationSent: {
    justifyContent: "flex-end"
  },
  body: {
    position: "relative",
    padding: ".625rem 1rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: "white"
  },
  bodyReceived: {
    "&::after": {
      position: "absolute",
      top: 0,
      width: 0,
      height: 0,
      content: '""',
      border: `5px solid ${theme.palette.primary.main}`,
      borderBottomColor: "transparent",
      left: "-7px",
      borderLeftColor: "transparent"
    }
  },
  bodySent: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    float: "right",
    order: 1,
    "&::after": {
      position: "absolute",
      bottom: 0,
      width: 0,
      height: 0,
      content: '""',
      border: `5px solid ${theme.palette.secondary.main}`,
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      right: "-7px"
    }
  },
  date: {
    display: "block",
    fontSize: "11px",
    paddingTop: "2px",
    fontStyle: "italic",
    fontWeight: "600",
    color: theme.palette.primary.contrastText
  },
  dateSent: {
    textAlign: "right"
  },
  input: {
    flex: "1 1 0%",
    boxSizing: "border-box"
  }
}));

const Chat = () => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleDrawerToggle = () => setOpened(!opened);

  const menu = (
    <List subheader={<ListSubheader disableSticky>Contacts</ListSubheader>}>
      {mockContacts.map((contact, index) => (
        <ListItem key={index} button>
          {contact.avatar}
          <ListItemText
            primary={contact.name}
            secondary={contact.status}
            inset
          />
        </ListItem>
      ))}
    </List>
  );
  return (
    <Wrapper padding={false}>
      <AppBar position="static">
        <Toolbar />
        <Toolbar />
      </AppBar>

      <Grid container spacing={0} justify={"center"} className={classes.header}>
        <Grid item xs={11} sm={11} md={10} lg={9}>
          <Card>
            <div className={classes.root}>
              <AppBar
                position="absolute"
                className={classes.appBar}
                color="default"
              >
                <Toolbar className={classes.toolBar}>
                  <Hidden mdUp>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => handleDrawerToggle()}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                  <div className={classes.headerLeft}>
                    <Avatar
                      alt=""
                      src={`${process.env.PUBLIC_URL}/static/images/face1.jpg`}
                    />
                  </div>
                  <List dense>
                    <ListItem>
                      <Avatar
                        alt=""
                        src={`${process.env.PUBLIC_URL}/static/images/face2.jpg`}
                      />
                      <ListItemText primary="Bobby" secondary="Online" />
                    </ListItem>
                  </List>
                  <span className="flexSpacer" />
                  <IconButton color="inherit">
                    <MoreVertIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <div className={classes.wrapper}>
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
                <main className={classes.main}>
                  <div className={classes.content}>
                    {mockChats.map((chat, index) => (
                      <div
                        key={index}
                        className={classNames(
                          classes.conversation,
                          chat.type === "sent"
                            ? classes.conversationSent
                            : classes.conversationReceived
                        )}
                      >
                        <div
                          className={classNames(
                            classes.body,
                            chat.type === "sent"
                              ? classes.bodySent
                              : classes.bodyReceived
                          )}
                        >
                          <Typography color="inherit">
                            {chat.message}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={classNames(
                              classes.date,
                              chat.type === "sent"
                                ? classes.dateSent
                                : classes.dateReceived
                            )}
                          >

                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Divider />
                  <div className="px-2">
                    <Grid
                      container
                      spacing={0}
                      justify={"center"}
                      alignItems={"center"}
                    >
                      <TextField
                        label="Write a message"
                        type="text"
                        margin="normal"
                        className={classes.input}
                      />
                      <Fab
                        color="primary"
                        aria-label="send"
                        className={classes.button}
                      >
                        <SendIcon />
                      </Fab>
                    </Grid>
                  </div>
                </main>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Chat;
