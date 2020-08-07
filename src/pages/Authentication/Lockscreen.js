import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  avatar: {
    position: "relative",
    display: "block",
    margin: "-75px auto 0"
  },
  lockscreenWrapper: {
    flex: "none",
    maxWidth: "280px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Lockscreen = () => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.lockscreenWrapper}>
          <Card className={classes.card}>
            <CardContent>
              <form>
                <div className={classes.avatar}>
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/avatar.jpg`}
                    alt="user"
                    title="user"
                  />
                </div>
                <Typography variant="body1" className="mt-1">
                  David Miller
                </Typography>
                <TextField
                  id="username"
                  label="Username"
                  className={classNames(classes.textField, "mt-0 mb-1")}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                  Unlock
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lockscreen;
