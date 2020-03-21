import { RouteConfig } from 'react-router-config';
import { Authorize } from 'views/Authorize';
import { AuthCallback } from 'views/AuthCallback';
import { NotFound } from 'views/NotFound';

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_AUTHORIZE = '/authorize';
export const ROUTE_TOP = '/top';
export const ROUTE_ALBUMS = '/albums';
export const ROUTE_TRACKS = '/tracks';
export const ROUTE_ARTISTS = '/artists';

export const guestRoutes: RouteConfig[] = [
  {
    path: ROUTE_AUTHORIZE,
    component: AuthCallback,
  },
  {
    component: Authorize,
  },
];

export const loggedInRoutes: RouteConfig[] = [
  // {
  //   path: [ROUTE_HOME, ROUTE_AUTHORIZE],
  //   // exact: true,
  //   // component: HomeScreen,
  //   routes: [],
  // },
  // {
  //   path: ROUTE_TOP,
  //   // component: TopPage
  // },
  // {
  //   path: `${ROUTE_ALBUMS}/:id`,
  //   // component: Album
  // },
  // {
  //   path: ROUTE_ALBUMS,
  //   // component: Albums
  // },
  // {
  //   path: ROUTE_TRACKS,
  //   // component: Tracks
  // },
  // {
  //   path: `${ROUTE_ARTISTS}/:id`,
  //   // component: Artist
  // },
  {
    component: NotFound,
  },
];
