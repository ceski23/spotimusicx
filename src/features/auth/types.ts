/* eslint-disable camelcase */

export interface Image {
  width?: number;
  height?: number;
  url: string;
}

export interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
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
