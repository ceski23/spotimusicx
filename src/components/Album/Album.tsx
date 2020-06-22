import React, { FC, ReactElement } from 'react';
import { Album as AlbumType, SimplifiedAlbum } from 'features/apiTypes';
import styled from '@emotion/styled';
import { LinksGroup } from 'components/LinksGroup';
import { SimpleLink } from 'components/SimpleLink';
import { ROUTE_ARTISTS, ROUTE_ALBUMS } from 'routes';

interface Props {
  album: AlbumType | SimplifiedAlbum;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  transition: 0.3s;
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.7);
`;
const Cover = styled.img`
  height: 150px;
  cursor: pointer;
  border-radius: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  transition: 0.5s;
`;

const Title = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  text-decoration: none;
  color: white;
`;

export const Album: FC<Props> = ({ album, onClick, ...props }): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Container onClick={onClick} {...props}>
    <Cover src={album.images[0].url} alt={album.name} />

    <Info>
      <SimpleLink to={`${ROUTE_ALBUMS}/${album.id}`}>
        <Title>{album.name}</Title>
      </SimpleLink>

      <LinksGroup
        collection={album.artists}
        renderElement={((artist) => (
          <SimpleLink to={`${ROUTE_ARTISTS}/${artist.id}`}>{artist.name}</SimpleLink>
        ))}
      />
    </Info>
  </Container>
);
