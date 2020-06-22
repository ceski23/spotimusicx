import { RouteConfig } from 'react-router-config';
import { Authorize } from 'views/Authorize';
import { AuthCallback } from 'views/AuthCallback';
import { NotFound } from 'views/NotFound';
import { TracksPage } from 'views/TracksPage';
import { SavedAlbumsPage } from 'views/SavedAlbumsPage';
import { AlbumPage } from 'views/AlbumPage';
import { ArtistPage } from 'views/ArtistPage';
import { RedirectToHome } from 'components/RedirectToHome';
import { HomePage } from 'views/HomePage';

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_AUTHORIZE = '/authorize';
export const ROUTE_TOP = '/top';
export const ROUTE_ALBUMS = '/albums';
export const ROUTE_SAVED_ALBUMS = '/saved_albums';
export const ROUTE_SAVED_TRACKS = '/saved_tracks';
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
  {
    path: ROUTE_AUTHORIZE,
    component: RedirectToHome,
  },
  {
    path: ROUTE_HOME,
    component: HomePage,
    exact: true,
  },
  // {
  //   path: ROUTE_TOP,
  //   // component: TopPage
  // },
  {
    path: `${ROUTE_ALBUMS}/:id`,
    component: AlbumPage,
  },
  {
    path: ROUTE_SAVED_ALBUMS,
    component: SavedAlbumsPage,
  },
  {
    path: ROUTE_SAVED_TRACKS,
    component: TracksPage,
  },
  {
    path: `${ROUTE_ARTISTS}/:id`,
    component: ArtistPage,
  },
  {
    component: NotFound,
  },
];
