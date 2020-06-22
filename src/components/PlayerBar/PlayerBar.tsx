/* eslint-disable camelcase */
/** @jsx jsx */
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { slideUp, Theme } from 'theme';
import Color from 'color';
import { useSelector } from 'react-redux';
import {
  selectPlaybackState, selectPlayer, selectTrackColor, selectColor,
} from 'features/spotify/slice';
import { ReactComponent as PrevIcon } from 'assets/prev_alt.svg';
import { ReactComponent as NextIcon } from 'assets/next_alt.svg';
import { ReactComponent as PlayIcon } from 'assets/play_alt.svg';
import { ReactComponent as PauseIcon } from 'assets/pause_alt.svg';
import { css, jsx } from '@emotion/core';
import { Seekbar } from 'components/Seekbar';
import { TrackInfo } from 'components/TrackInfo';
import { VolumeBar } from 'components/VolumeBar';

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
  animation: ${slideUp} 0.3s ease;
  transition: background 0.5s;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100%;
  transition: 0.3s;
  justify-content: center;
`;

const smallIcon = css`
  width: 25px;
  height: 25px;
  fill: #fff;
  opacity: 0.5;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const bigIcon = css`
  width: 40px;
  height: 40px;
  fill: #fff;
  margin: 0 20px;
  opacity: 0.5;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Placeholder = styled.div`
  flex: 1;
`;

export const PlayerBar: FC<Props> = (): ReactElement => {
  const state = useSelector(selectPlaybackState);
  const player = useSelector(selectPlayer);
  const trackColor = useSelector(selectTrackColor);
  const color = useSelector(selectColor);

  const handleTogglePlayback = () => {
    player.togglePlay();
  };

  const handleNextTrack = () => {
    player.nextTrack();
  };

  const handlePrevTrack = () => {
    player.previousTrack();
  };

  const PlaybackIcon = state?.paused ? PlayIcon : PauseIcon;
  const currentTrack = state?.track_window.current_track;

  return (
    <Container color={trackColor ?? color}>
      {currentTrack ? (
        <TrackInfo track={currentTrack} />
      ) : (
        <Placeholder />
      )}

      <Controls>
        <Buttons>
          <PrevIcon css={smallIcon} onClick={handlePrevTrack} />
          <PlaybackIcon css={bigIcon} onClick={handleTogglePlayback} />
          <NextIcon css={smallIcon} onClick={handleNextTrack} />
        </Buttons>

        <Seekbar player={player} state={state} />
      </Controls>

      <VolumeBar />
    </Container>
  );
};
