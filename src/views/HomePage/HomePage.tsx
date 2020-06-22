import React, {
  FC, ReactElement, useRef, useEffect,
} from 'react';
import styled from '@emotion/styled';
import { PageTitle } from 'components/PageTitle';
import { Track } from 'components/Track';
import { RouteComponentProps } from 'react-router-dom';
import { useThunkDispatch } from 'store';
import { selectSavedTracks, getSavedTracks, getMoreSavedTracks } from 'features/library/slice';
import { useSelector } from 'react-redux';
import { slideUp } from 'theme';
import { InfiniteList } from 'components/InfiniteList';
import { playUris, selectRecentlyPlayed, getRecentlyPlayed } from 'features/player/slice';
import { unwrapResult } from '@reduxjs/toolkit';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;

const AnimatedTrack = styled(Track)`
  animation: ${slideUp} 0.3s ease;
`;

const List = styled.div`
  width: 90%;
  padding-bottom: 150px;
`;

export const HomePage: FC<RouteComponentProps> = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const recentlyPlayed = useSelector(selectRecentlyPlayed);

  useEffect(() => {
    dispatch(getRecentlyPlayed({ limit: 50 })).then(unwrapResult);
  }, [dispatch]);

  return (
    <Container>
      <PageTitle>Ostatnio odtwarzane</PageTitle>

      <List>
        {recentlyPlayed.map(({ track }) => (
          <AnimatedTrack
            key={track.id}
            track={track}
            onClick={() => {
              dispatch(playUris({ uris: [track.uri] }));
            }}
          />
        ))}
      </List>
    </Container>
  );
};
