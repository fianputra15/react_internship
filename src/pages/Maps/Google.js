import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Wrapper } from '../../components';
import { makeStyles } from '@material-ui/core/styles';

const polyCoordinates = [
  {
    lat: -34.397,
    lng: 150.644
  },
  {
    lat: -34.754764,
    lng: 149.736246
  }
];

const styles = [
  {
    featureType: 'all',
    stylers: [
      {
        saturation: -80
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#00ffee'
      },
      {
        saturation: 50
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
];

const useStyles = makeStyles(theme => ({
  map: {
    [theme.breakpoints.down('sm')]: {
      height: `calc(100vh - 182px)`
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 204px)`
    }
  }
}));

const DemoMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: false,
        styles: props.showStyles ? styles : null
      }}
    >
      {props.showInfoWindow && (
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
          onClick={props.onToggleOpen}
        >
          {props.isInfoWindowOpen && (
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <Typography>InfoWindow content</Typography>
            </InfoWindow>
          )}
        </Marker>
      )}
      {props.showPolyline && (
        <Polyline
          path={polyCoordinates}
          geodesic={true}
          options={{
            strokeColor: '#000000',
            strokeOpacity: 1,
            strokeWeight: 2
          }}
        />
      )}
    </GoogleMap>
  ))
);

const Google = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const handleInfoWindowToggle = () => setIsInfoWindowOpen(!isInfoWindowOpen);

  const handleTabToggle = (event, tab) => setTab(tab);

  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const loadingElement = <div style={{ height: `100%` }} />;
  const containerElement = <div className={classes.map} />;
  const mapElement = <div style={{ height: `100%` }} />;

  return (
    <Wrapper padding={false}>
      <AppBar position="static">
        <Toolbar />
        <Toolbar />
      </AppBar>

      <Grid
        container
        spacing={1}
        justify={'center'}
        style={{ marginTop: '-52px' }}
      >
        <Grid item xs={11} sm={11} md={10} lg={9}>
          <Card>
            <Tabs value={tab} onChange={handleTabToggle} scrollButtons="auto">
              <Tab label="Basic" />
              <Tab label="Styles" />
              <Tab label="Polyline" />
              <Tab label="Info Window" />
            </Tabs>
            {tab === 0 && (
              <DemoMap
                googleMapURL={googleMapURL}
                loadingElement={loadingElement}
                containerElement={containerElement}
                mapElement={mapElement}
              />
            )}
            {tab === 1 && (
              <DemoMap
                googleMapURL={googleMapURL}
                loadingElement={loadingElement}
                containerElement={containerElement}
                mapElement={mapElement}
                showStyles={true}
              />
            )}
            {tab === 2 && (
              <DemoMap
                googleMapURL={googleMapURL}
                loadingElement={loadingElement}
                containerElement={containerElement}
                mapElement={mapElement}
                showPolyline={true}
              />
            )}
            {tab === 3 && (
              <DemoMap
                googleMapURL={googleMapURL}
                loadingElement={loadingElement}
                containerElement={containerElement}
                mapElement={mapElement}
                showInfoWindow={true}
                onToggleOpen={handleInfoWindowToggle}
                isInfoWindowOpen={isInfoWindowOpen}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Google;
