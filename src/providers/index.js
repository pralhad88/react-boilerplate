import CssBaseline from '@material-ui/core/CssBaseline';
import { nest } from 'recompose';

import Routing from './routing';
import StoreProvider from './store';
import FetchProvider from './NGFetch';
import UserAuthProvider from './UserAuth';
import MuiThemeProvider from './muiTheme';
import NotiStackProvider from './NotiStack';

export default nest(
  CssBaseline,
  MuiThemeProvider,
  StoreProvider,
  NotiStackProvider,
  FetchProvider,
  UserAuthProvider,
  Routing
);
