import React, {
  FC, ReactElement, useRef, useEffect,
} from 'react';
import styled from '@emotion/styled';
import { PageTitle } from 'components/PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import { useThunkDispatch } from 'store';
import { selectSavedAlbums, getSavedAlbums, getMoreSavedAlbums } from 'features/library/slice';
import { useSelector } from 'react-redux';
import { slideUp } from 'theme';
import { InfiniteList } from 'components/InfiniteList';
import { unwrapResult } from '@reduxjs/toolkit';
import { Album } from 'components/Album';
import { playUris } from 'features/player/slice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;

const AnimatedAlbum = styled(Album)`
  animation: ${slideUp} 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const List = styled(InfiniteList)`
  width: 90%;
  padding-bottom: 150px;
  display: flex;
  flex-wrap: wrap;
`;

export const SavedAlbumsPage: FC<RouteComponentProps> = (): ReactElement => {
  const listElement = useRef<HTMLDivElement>(null);
  const dispatch = useThunkDispatch();
  const { items, fetching } = useSelector(selectSavedAlbums);

  useEffect(() => {
    dispatch(getSavedAlbums(0)).then(unwrapResult);
  }, [dispatch]);

  return (
    <Container ref={listElement}>
      <PageTitle>Zapisane albumy</PageTitle>

      <List
        isLoading={fetching}
        fetchNext={() => dispatch(getMoreSavedAlbums()).then(unwrapResult)}
        scrollRef={listElement}
      >
        {(items || []).map(({ album }) => (
          <AnimatedAlbum
            key={album.id}
            album={album}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/camelcase
              dispatch(playUris({ context_uri: album.uri }));
            }}
          />
        ))}
      </List>
    </Container>
  );
};
