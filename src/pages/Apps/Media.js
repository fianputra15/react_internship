import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Toolbar from "@material-ui/core/Toolbar";
import { Wrapper } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

const useStyles = makeStyles(theme => ({
  toolBar: {
    paddingLeft: theme.spacing(1) / 2,
    paddingRight: theme.spacing(1) / 2
  }
}));

let images = [];

for (let num = 1; num <= 21; num += 1) {
  images.push(num);
}

const getColWidth = bp => {
  let col;
  if (bp === "lg") col = 3;
  if (bp === "md") col = 2;
  if (bp === "xs") col = 1;
  return col;
};

const gallery = images.map(tile => (
  <GridListTile key={tile}>
    <img
      src={`${process.env.PUBLIC_URL}/static/images/unsplash/${tile}.jpg`}
      alt={tile}
    />
    <GridListTileBar
      title={tile}
      subtitle={<span>Gallery image: {tile}</span>}
      actionIcon={
        <IconButton style={{ color: "rgba(255, 255, 255, 0.87)" }}>
          <FavoriteIcon />
        </IconButton>
      }
      className="px-1"
    />
  </GridListTile>
));

const Media = ({ width }) => {
  const classes = useStyles();
  return (
    <Wrapper padding={false}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          <Button variant="contained" color="default" className="mx-1">
            Add album
          </Button>
          <span className="flexSpacer" />
          <IconButton color="inherit" aria-label="Menu">
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Menu">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Menu">
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <GridList cols={getColWidth(width)} spacing={1} cellHeight={400}>
        {gallery}
      </GridList>
    </Wrapper>
  );
};

export default withWidth()(Media);
