// Pages
import {
  // AppBar,
  // Autocomplete,
  // Avatars,
  // BackendError,
  // Badges,
  // Blank,
  // ButtonNavigation,
  // Buttons,
  // Calendar,
  // Cards,
  // History,
  // Absensi,
  // Charts,
  // Chat,
  Magang,
  Users,
  Pengaturan,
  // Nilai,
  // Preprocessing,
  // Parsing,
  // Chips,
  // Detail,
  // Dialogs,
  // Dividers,
  // Drawers,
  // Editor,
  // ExpansionPanels,
  // Google,
  // GridList,
  Home,
  // Invoice,
  // Leaflet,
  // Lists,
  // Lockscreen,
  // Media,
  // Menus,
  // Messages,
  // NotFound,
  // Paper,
  // PasswordReset,
  // Pickers,
  // PricingPage,
  // Products,
  // Progress,
  // SelectionControls,
  // Selects,
  // Signin,
  // Signup,
  // Snackbars,
  // Social,
  // Steppers,
  // Tables,
  // Tabs,
  // Taskboard,
  // TextFields,
  // TimelinePage,
  // Tooltips,
  // Widgets
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

export default {
  items: [
    {
      path: '/supervisor',
      name: 'Home',
      type: 'link',
      icon: ExploreIcon,
      component: Home
    },
    {
      path: '/supervisor/master',
      name: 'Master',
      role: 'spv',
      type: 'submenu',
      icon: AppsIcon,
      // badge: {
      //   type: 'primary',
      //   value: '3'
      // },
      children: [
        {
          path: '/users',
          name: 'Users',
          role: 'spv',
          component: Users
        },
        {
          path: '/magang',
          name: 'Magang',
          role: 'spv',
          component: Magang
        },
      ]
    },
    {
      path: '/supervisor/data',
      name: 'Manajemen Data',
      type: 'submenu',
      role: 'spv',
      icon: ShowChartIcon,
      children: [
        {
          path: '/Absensi',
          name: 'Absensi',
          role: 'spv',
          component: Magang
        },
        {
          path: '/laporan',
          role: 'spv',
          name: 'Laporan',
          component: Magang
        },
      ]
    },
    {
      path: '/supervisor/wfh',
      role: 'spv',
      name: 'Pengaturan WFH',
      type: 'Menu',
      icon: SettingsIcon,
      component : Pengaturan
    },
  ]
};
