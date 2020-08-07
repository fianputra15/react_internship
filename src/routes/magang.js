// Pages
import {
  History,
  Absensi,
  UbahPassword,
} from '../pages';
import AppsIcon from '@material-ui/icons/Apps';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import FaceIcon from '@material-ui/icons/Face';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import NavigationIcon from '@material-ui/icons/Navigation';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import PhotoIcon from '@material-ui/icons/Photo';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import Assignment from '@material-ui/icons/Assignment';
import Timeline from '@material-ui/icons/Timeline';
export default {
  items: [
    {
      path: '/magang',
      name: 'Absensi',
      type: 'Menu',
      icon: Assignment,
      component : Absensi
    },
    {
      path: '/magang/history',
      name: 'Riwayat',
      type: 'Menu',
      icon: Timeline,
      component : History
    },
  ]
};
