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
import { playUris } from 'features/player/slice';
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

const List = styled(InfiniteList)`
  width: 90%;
  padding-bottom: 150px;
`;

export const TracksPage: FC<RouteComponentProps> = (): ReactElement => {
  const listElement = useRef<HTMLDivElement>(null);
  const dispatch = useThunkDispatch();
  const { items, fetching } = useSelector(selectSavedTracks);

  useEffect(() => {
    dispatch(getSavedTracks(0)).then(unwrapResult);
  }, [dispatch]);

  return (
    <Container ref={listElement}>
      <PageTitle>Zapisane utwory</PageTitle>

      <List
        isLoading={fetching}
        fetchNext={() => dispatch(getMoreSavedTracks()).then(unwrapResult)}
        scrollRef={listElement}
      >
        {(items || []).map(({ track }) => (
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
