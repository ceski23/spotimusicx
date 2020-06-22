import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/home.svg';
import { ReactComponent as TracksIcon } from 'assets/show.svg';
import { ReactComponent as AlbumIcon } from 'assets/disc.svg';
import {
  ROUTE_SAVED_TRACKS, ROUTE_HOME, ROUTE_SAVED_ALBUMS,
} from 'routes';
import { User } from 'components/User';
import { useSelector } from 'react-redux';
import Color from 'color';
import { slideRight } from 'theme';
import { selectUser } from 'features/auth/slice';

const Link = styled(NavLink)`
  color: rgba(255, 255, 255, 0.6);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-size: 1.3em;
  text-decoration: none;
  font-weight: 500;

  &.active {
    color: white;
  }

  & + svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 20px;
    fill: rgba(255, 255, 255, 0.6);
  }

  &.active + svg {
    fill: white;
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 15px 30px;
  justify-content: flex-end;
  align-items: center;
  transition: 0.3s;
`;

const Container = styled.div`
  width: 300px;
  background: rgba(31, 36, 31, 0.8);
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  margin-bottom: 100px;
  animation: ${slideRight} 0.3s ease;
`;

const AccountLink = styled.a`
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: ${Color('white').alpha(0.1).string()};
  }
`;

const items = [
  {
    to: ROUTE_HOME, text: 'Przegląd', Icon: HomeIcon, exact: true,
  },
  { to: ROUTE_SAVED_TRACKS, text: 'Utwory', Icon: TracksIcon },
  { to: ROUTE_SAVED_ALBUMS, text: 'Albumy', Icon: AlbumIcon },
  // { to: ROUTE_TOP, text: 'Twoje top', Icon: TopIcon },
];

export const Sidebar: FC = (): ReactElement => {
  const user = useSelector(selectUser);

  return (
    <Container>
      {items.map(({
        Icon, text, to, exact,
      }) => (
        <NavItem key={to}>
          <Link to={to} exact={exact}>{text}</Link>
          <Icon />
        </NavItem>
      ))}

      <div style={{ flex: 1 }} />

      {user && (
        <AccountLink href={user.external_urls.spotify}>
          <User user={user} />
        </AccountLink>
      )}
    </Container>
  );
};
