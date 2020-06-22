import React, { FC, ReactElement } from 'react';
import { Track as TrackType, SimplifiedTrack } from 'features/apiTypes';
import styled from '@emotion/styled';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { LinksGroup } from 'components/LinksGroup';
import { SimpleLink } from 'components/SimpleLink';
import { ROUTE_ARTISTS, ROUTE_ALBUMS } from 'routes';

interface Props {
  track: TrackType | SimplifiedTrack;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  transition: 0.3s;
  border-radius: 5px;
  overflow: hidden;
  color: white;
  align-items: center;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }
`;

const Duration = styled.p`
  margin: 0 20px;
`;

const Cover = styled.img`
  height: 70px;
  cursor: pointer;
  border-radius: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  transition: 0.5s;
  margin-left: 20px;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Dot = styled.span`
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.7);
`;

const isTrack = (track: TrackType | SimplifiedTrack): track is TrackType => (
  (track as TrackType).album !== undefined
);

export const Track: FC<Props> = ({ track, onClick, ...props }): ReactElement => {
  const { formatTime } = useDateFormatter();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container onClick={onClick} {...props}>
      {isTrack(track) && <Cover src={track.album.images[0].url} alt={track.name} />}

      <Info>
        <Title>{track.name}</Title>

        <Links>
          <LinksGroup
            collection={track.artists}
            renderElement={((artist) => (
              <SimpleLink to={`${ROUTE_ARTISTS}/${artist.id}`}>{artist.name}</SimpleLink>
            ))}
          />

          {isTrack(track) && (
          <>
            <Dot>•</Dot>
            <SimpleLink to={`${ROUTE_ALBUMS}/${track.album.id}`}>{track.album.name}</SimpleLink>
          </>
          )}
        </Links>
      </Info>

      <div style={{ flex: 1 }} />

      <Duration>{formatTime(track.duration_ms)}</Duration>
    </Container>
  );
};
