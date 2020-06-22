/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, ReactElement, useEffect } from 'react';
import styled from '@emotion/styled';
import { useThunkDispatch } from 'store';
import { useSelector } from 'react-redux';
import {
  selectCurrentAlbum, fetchAlbum, selectAlbumsLoading,
} from 'features/albums/slice';
import { SimpleLink } from 'components/SimpleLink';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'components/Button';
import { playUris } from 'features/player/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import Vibrant from 'node-vibrant';
import { setColor } from 'features/spotify/slice';
import { Track } from 'components/Track';
import { NotFound } from 'views/NotFound';
import { slideUp } from 'theme';
import { Loading } from 'components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;

const Info = styled.div`
  display: flex;
  max-width: 400px;
  padding-top: 50px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  flex: 1;
`;

const Cover = styled.img`
  width: 70%;
  object-fit: contain;
  border-radius: 5px;
`;

const Title = styled.h2`
  color: white;
  font-weight: 500;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-size: 1.7em;
  text-decoration: none;
  margin: 0 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const TracksList = styled.div`
  flex-direction: column;
  flex: 1;
  transition: 0.5s;
  height: 100%;
  overflow: scroll;
  padding: 30px 0 130px 0;
  box-sizing: border-box;
  margin-right: 20px;
  animation: ${slideUp} 0.5s ease;
`;

interface RouteParams {
  id: string;
}

export const AlbumPage: FC<RouteComponentProps<RouteParams>> = ({ match }): ReactElement => {
  const dispatch = useThunkDispatch();
  const data = useSelector(selectCurrentAlbum);
  const loading = useSelector(selectAlbumsLoading);
  const albumId = match.params.id;

  useEffect(() => {
    dispatch(fetchAlbum(albumId))
      .then(unwrapResult)
      .then((album) => {
        Vibrant.from(album.images[0].url).getPalette().then((palette) => {
          dispatch(setColor(palette.Vibrant?.getHex() || '#00d663'));
        });
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, [albumId, dispatch]);

  return (
    <Container>
      {loading && <Loading />}

      {!loading && !data && (
        <NotFound text="Nie znaleziono albumu" />
      )}

      {!loading && data && (
        <>
          <Info>
            <Cover src={data.images[0].url} alt={data.name} />
            <Title>{data.name}</Title>

            <SimpleLink to={`/artists/${data.artists[0].id}`}>
              {data.artists[0].name}
            </SimpleLink>

            <Button onClick={() => dispatch(playUris({ context_uri: data.uri }))}>
              Odtwórz
            </Button>
          </Info>

          <TracksList>
            {data.tracks.items.map((track) => (
              <Track
                key={track.id}
                track={track}
                onClick={() => dispatch(playUris({ uris: [track.uri] }))}
              />
            ))}
          </TracksList>
        </>
      )}
    </Container>
  );
};
