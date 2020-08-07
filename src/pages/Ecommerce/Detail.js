import React, { useState } from "react";
import { mockProduct, mockReviews } from "../../utils/mock";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { Wrapper } from "../../components";
import classNames from "classnames";
import { formatPrice } from "../../helpers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  imageHeader: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
    },
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(1) / -2,
      left: theme.spacing(1) / -2,
      boxShadow: theme.shadows[5],
      borderRadius: theme.shape.borderRadius
    },
    minHeight: "400px",
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/images/unsplash/fashion3.jpg)`,
    backgroundPosition: "top"
  },
  tabContainer: {
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper
  },
  tabRoot: {
    textTransform: "initial",
    color: theme.palette.text.primary
  },
  tabsRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  inactive: {
    color: theme.palette.text.secondary
  },
  group: {
    display: "inline-block",
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius
  },
  groupButton: {
    borderRadius: 0,
    boxShadow: "none",
    minWidth: "40px",
    "&:first-child": {
      borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
    },
    "&:last-child": {
      borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`
    }
  },
  optionTitle: {
    minWidth: "50px"
  }
}));

const Detail = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [product] = useState(mockProduct());
  const [reviews] = useState(mockReviews);

  const handleTabToggle = (event, tab) => setTab(tab);

  return (
    <Wrapper>
      <Card className={classes.card}>
        <Grid container spacing={0} direction={"row"} alignItems={"stretch"}>
          <Grid item xs={12} sm={6} md={5}>
            <div className={classes.imageHeader} />
          </Grid>
          <Grid item xs={12} sm={6} md={7} className="pa-1">
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="subtitle1">{product.description}</Typography>
            <Typography gutterBottom>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  className={star <= product.rating ? null : classes.inactive}
                  key={star}
                >
                  &#9733;
                </span>
              ))}
              <span className="px-1">({product.rating}) Votes</span>
              <Link to="/">{product.rating} customer reviews</Link>
            </Typography>

            <Typography variant="h6" className="mt-1" gutterBottom>
              <span>{formatPrice(product.price)}</span>
              {product.discounted && (
                <span
                  className={classNames(
                    classes.inactive,
                    "strikethrough text-sm"
                  )}
                >
                  {formatPrice(product.discount)}
                </span>
              )}
              <span className={classNames(classes.inactive, "text-xs")}>
                *excluding tax
              </span>
            </Typography>

            <Typography gutterBottom>
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Curabitur blandit tempus porttitor. Sed posuere consectetur
              est at lobortis. Vestibulum id ligula porta felis euismod semper.
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue
              laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
              nibh, ut fermentum massa justo sit amet risus. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Donec ullamcorper
              nulla non metus auctor fringilla. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit.
            </Typography>

            <Grid container spacing={0} direction={"row"} alignItems={"center"}>
              <Typography className={classes.optionTitle}>Size</Typography>
              <div className={classNames(classes.group, "my-1 mx-1")}>
                <Button variant="contained" className={classes.groupButton}>
                  XS
                </Button>
                <Button variant="contained" className={classes.groupButton}>
                  S
                </Button>
                <Button variant="contained" className={classes.groupButton}>
                  M
                </Button>
                <Button variant="contained" className={classes.groupButton}>
                  L
                </Button>
              </div>
            </Grid>

            <Grid container spacing={0} direction={"row"} alignItems={"center"}>
              <Typography className={classes.optionTitle}>Color</Typography>
              <div className={classNames(classes.group, "my-1 mx-1")}>
                <Button variant="contained" className={classes.groupButton}>
                  R
                </Button>
                <Button variant="contained" className={classes.groupButton}>
                  G
                </Button>
                <Button variant="contained" className={classes.groupButton}>
                  B
                </Button>
              </div>
            </Grid>

            <div className="block my-1" />

            <Button variant="contained" color="primary">
              Add to cart
            </Button>
            <Hidden xsDown>
              <span className="mx-1" />
            </Hidden>
            <Hidden smUp>
              <div className="block my-2" />
            </Hidden>
            <Button variant="contained" color="secondary">
              Add to my wishlist
            </Button>
          </Grid>
        </Grid>

        <div className={classes.tabContainer}>
          <Tabs
            value={tab}
            onChange={handleTabToggle}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
            scrollButtons="auto"
          >
            <Tab
              disableRipple
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              label="Description"
            />
            <Tab
              disableRipple
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              label="Specificaions"
            />
            <Tab
              disableRipple
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              label="Customer Reviews"
            />
          </Tabs>
          {tab === 0 && (
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Donec sed odio dui.
              </Typography>
              <Typography gutterBottom>
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor
                mauris condimentum nibh, ut fermentum massa justo sit amet
                risus. Cum sociis natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </Typography>
              <Typography>
                Sed posuere consectetur est at lobortis. Nulla vitae elit
                libero, a pharetra augue. Donec id elit non mi porta gravida at
                eget metus. Maecenas faucibus mollis interdum. Vestibulum id
                ligula porta felis euismod semper. Curabitur blandit tempus
                porttitor. Fusce dapibus, tellus ac cursus commodo, tortor
                mauris condimentum nibh, ut fermentum massa justo sit amet
                risus.
              </Typography>
            </CardContent>
          )}
          {tab === 1 && (
            <CardContent>
              <Typography className="py-1">
                <span className={classes.inactive}>Processor:&nbsp;</span>
                <span>2.0GHz dual-core Intel Core i5 processor</span>
              </Typography>

              <Typography className="py-1">
                <span className={classes.inactive}>CPU:&nbsp;</span>
                <span>Turbo Boost up to 3.1GHz</span>
              </Typography>

              <Typography className="py-1">
                <span className={classes.inactive}>RAM:&nbsp;</span>
                <span>8GB 1866MHz memory</span>
              </Typography>

              <Typography className="py-1">
                <span className={classes.inactive}>Hard Drive:&nbsp;</span>
                <span>256GB PCIe-based SSD1</span>
              </Typography>

              <Typography className="py-1">
                <span className={classes.inactive}>Graphics Chip:&nbsp;</span>
                <span>Intel Iris Graphics 540</span>
              </Typography>

              <Typography className="py-1">
                <span className={classes.inactive}>Ports:&nbsp;</span>
                <span>Two Thunderbolt 3 ports</span>
              </Typography>
            </CardContent>
          )}
          {tab === 2 && (
            <CardContent>
              <List>
                {reviews.map((review, index) => (
                  <ListItem disableGutters={true} key={index}>
                    <Avatar alt="Remy Sharp" src={review.photo} />
                    <ListItemText
                      primary={review.from}
                      secondary={`${review.subject}  ${review.message}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          )}
        </div>
      </Card>
    </Wrapper>
  );
};

export default Detail;
