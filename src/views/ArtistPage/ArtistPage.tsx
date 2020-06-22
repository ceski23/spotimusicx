/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, ReactElement, useEffect } from 'react';
import styled from '@emotion/styled';
import { useThunkDispatch } from 'store';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { playUris } from 'features/player/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import Vibrant from 'node-vibrant';
import { setColor } from 'features/spotify/slice';
import { Track } from 'components/Track';
import { NotFound } from 'views/NotFound';
import { slideUp } from 'theme';
import {
  fetchArtist, selectCurrentArtist, selectArtistTopTracks,
  fetchTopTracks, selectArtistAlbums, fetchArtistAlbums,
} from 'features/artists/slice';
import { Album } from 'components/Album';
import { Loading } from 'components/Loading';

const Container = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  overflow: scroll; */
`;

const Header = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
  animation: ${slideUp} 0.5s ease;
  padding: 50px 0;
`;

const Name = styled.h2`
  color: white;
  padding: 0;
  font-size: 4em;
  margin: 0;
  text-align: center;
  margin-left: 20px;
`;

const Section = styled.div`
  padding: 0 50px 100px;
  animation: ${slideUp} 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 100;
  color: white;
  margin: 0 0 40px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const AlbumsGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AlbumItem = styled(Album)`
  &:hover {
    transform: scale(1.1);
  }
`;

interface RouteParams {
  id: string;
}

export const ArtistPage: FC<RouteComponentProps<RouteParams>> = ({ match }): ReactElement => {
  const dispatch = useThunkDispatch();
  const { loading, data } = useSelector(selectCurrentArtist);
  const { data: topTracks, loading: topLoading } = useSelector(selectArtistTopTracks);
  const { data: albums, loading: albumsLoading } = useSelector(selectArtistAlbums);
  const artistId = match.params.id;

  useEffect(() => {
    dispatch(fetchArtist(artistId))
      .then(unwrapResult)
      .then((artist) => {
        Vibrant.from(artist.images[0].url).getPalette().then((palette) => {
          dispatch(setColor(palette.Vibrant?.getHex() || '#00d663'));
        });
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});

    dispatch(fetchTopTracks(artistId));
    dispatch(fetchArtistAlbums(artistId));
  }, [artistId, dispatch]);

  return (
    <Container>
      {loading && <Loading />}

      {!loading && !data && (
        <NotFound text="Nie znaleziono wykonawcy" />
      )}

      {!loading && data && (
        <>
          <Header>
            <Image src={data.images[0].url} />
            <Name>{data.name}</Name>
          </Header>

          <Section>
            <SectionTitle>Popularne</SectionTitle>
            {topLoading && <Loading />}

            {!topLoading && topTracks && topTracks.slice(0, 5).map((track) => (
              <Track
                track={track}
                key={track.id}
                onClick={() => dispatch(playUris({ uris: [track.uri] }))}
              />
            ))}
          </Section>

          <Section>
            <SectionTitle>Albumy</SectionTitle>
            {albumsLoading && <Loading />}

            {!albumsLoading && (
              <AlbumsGrid>
                {albums && albums.filter((a) => a.album_group !== 'appears_on').map((album) => (
                  <AlbumItem
                    key={album.id}
                    album={album}
                    onClick={() => dispatch(playUris({ context_uri: album.uri }))}
                  />
                ))}
              </AlbumsGrid>
            )}
          </Section>

          <Section>
            <SectionTitle>Pojawia się na</SectionTitle>
            {albumsLoading && <Loading />}

            {!albumsLoading && (
              <AlbumsGrid>
                {albums && albums.filter((a) => a.album_group === 'appears_on').map((album) => (
                  <AlbumItem
                    key={album.id}
                    album={album}
                    onClick={() => dispatch(playUris({ context_uri: album.uri }))}
                  />
                ))}
              </AlbumsGrid>
            )}
          </Section>
        </>
      )}
    </Container>
  );
};
