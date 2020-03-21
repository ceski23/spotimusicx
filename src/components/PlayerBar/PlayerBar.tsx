import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { enterAnimation, Theme } from 'theme';
import Color from 'color';
import { useSelector } from 'react-redux';
import { selectSpotifyState } from 'features/spotify/slice';
import { useSpotify } from 'hooks/useSpotify';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface ContainerProps {
  theme: Theme;
  color: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: ${({ theme }: ContainerProps) => theme.sizes.playerHeight};
  background: ${({ color }) => Color(color).alpha(0.9).darken(0.7).string()};
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  animation: ${enterAnimation} 0.3s ease;
  transition: background 0.5s;
`;

export const PlayerBar: FC<Props> = (): ReactElement => {
  const { color } = useSelector(selectSpotifyState);
  useSpotify();

  return (
    <Container color={color} />
  );
};
