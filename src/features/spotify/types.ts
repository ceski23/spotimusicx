/* eslint-disable camelcase */

import { Image } from 'features/auth/types';

export interface Album {
  name: string;
  uri: string;
  images: Image[];
}

export interface Artist {
  name: string;
  uri: string;
}

export interface Track {
  duration_ms: number;
  id: string;
  is_playable: boolean;
  media_type: string;
  name: string;
  type: string;
  uri: string;
  album: Album;
}

export interface State {
  context: {
    uri: string;
  };
  bitrate: number;
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: Track;
    next_tracks: Track[];
  };
}
