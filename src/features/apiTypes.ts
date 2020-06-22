/* eslint-disable camelcase */

import { PaginatedResponse } from 'api';

export interface PublicUser {
  display_name?: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: 'user';
  uri: string;
}

export interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: ExternalUrls;
  followers: {
    href?: string;
    total: number;
  };
  href: string;
  id: string;
  product: 'premium';
  type: string;
  uri: string;
  images: Image[];
}

export interface ExternalUrls {
  [key: string]: string;
}

export interface ExternalIds {
  [key: string]: string;
}

export interface Image {
  width?: number;
  height?: number;
  url: string;
}

export interface Track {
  duration_ms: number;
  id: string;
  is_playable: boolean;
  name: string;
  type: 'track';
  uri: string;
  external_urls: ExternalUrls;
  track_number: number;
  href: string;
  popularity: number;
  preview_url: string | null;
  external_ids: ExternalIds;
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
}

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface SimplifiedArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

export interface SimplifiedAlbum {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  album_type: 'album' | 'single' | 'compilation';
  artists: SimplifiedArtist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions: any;
  type: 'album';
  uri: string;
}

export interface Copyright {
  text: string;
  type: 'P' | 'C';
}

export interface Album {
  album_type: 'album' | 'single' | 'compilation';
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  artists: SimplifiedArtist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions: any;
  tracks: PaginatedResponse<SimplifiedTrack>;
  type: 'album';
  uri: string;
}

export interface SimplifiedPlaylist {
  collaborative: false;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PublicUser;
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}

export interface Followers {
  href?: string;
  total: number;
}

export interface SearchParams {
  /**
   * Search query keywords and optional field filters and operators.
   */
  q: string;
  /**
   * List of item types to search across.
   */
  type: Array<'artist' | 'album' | 'playlist' | 'track'>;
  /**
   * If a country code is specified, only artists, albums, and tracks with
   * content that is playable in that market is returned.
   */
  market?: string | 'from_token';
  /**
   * Maximum number of results to return.
   */
  limit?: number;
  /**
   * The index of the first result to return.
   */
  offset?: number;
}

export interface State {
  context: {
    uri?: string;
    metadata?: {};
  };
  duration: number;
  disallows: {
    pausing?: boolean;
    peeking_next?: boolean;
    peeking_prev?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
  };
  paused: boolean;
  position: number;
  repeat_mode: RepeatMode;
  shuffle: boolean;
  track_window: {
    current_track?: Track;
    previous_tracks: Track[];
    next_tracks: Track[];
  };
}

export enum RepeatMode {
  NO_REPEAT, ONCE_REPEAT, FULL_REPEAT
}

export interface SavedTrack {
  track: Track;
  added_at: Date;
}

export interface SavedAlbum {
  album: Album;
  added_at: Date;
}

export interface PlayHistory {
  track: SimplifiedTrack;
  played_at: string;
  context: Context;
}

export interface Context {
  type: 'artist' | 'album' | 'playlist';
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}
