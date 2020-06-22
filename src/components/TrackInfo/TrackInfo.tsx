import React, { FC, ReactElement } from 'react';
import { Track } from 'features/apiTypes';
import styled from '@emotion/styled';
import { slideRight } from 'theme';
import { SimpleLink } from 'components/SimpleLink';
import { ROUTE_ARTISTS } from 'routes';
import { LinksGroup } from 'components/LinksGroup';

interface Props {
  track: Track;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  flex: 1;
  animation: ${slideRight} 0.3s ease;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
  color: rgba(255, 255, 255, 0.82);
`;

const TrackTitle = styled.p`
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const TrackArtist = styled(SimpleLink)`
  margin: 0;
  font-weight: 100;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const Cover = styled.img`
  width: 60px;
  height: 60px;
`;

export const TrackInfo: FC<Props> = ({ track }): ReactElement => (
  <Container>
    <Cover
      src={track.album.images[0].url}
      alt={track.album.name}
    />

    <Info>
      <TrackTitle>{track && track.name}</TrackTitle>

      <LinksGroup
        collection={track.artists}
        renderElement={(artist) => (
          <TrackArtist to={`${ROUTE_ARTISTS}/${artist.uri.split('spotify:artist:')[1]}`}>
            {artist.name}
          </TrackArtist>
        )}
      />
    </Info>
  </Container>
);
