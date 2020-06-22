/* eslint-disable camelcase */
import React, {
  FC, ReactElement, useState, useEffect,
} from 'react';
import { format, parse } from 'date-fns';
import { useTheme } from 'emotion-theming';
import { useDebouncedCallback } from 'use-debounce';
import { State } from 'features/apiTypes';
import styled from '@emotion/styled';

interface Props {
  player: any;
  state?: State;
}

const getTimeString = (time: number) => (
  format(parse(time.toString(), 'T', new Date()), 'mm:ss')
);

const fixTime = (time: number) => (
  parseInt(time.toString().replace('.', ''), 10) || 0
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
`;

const StyledSeekbar = styled.input`
  width: 100%;
  appearance: none;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  outline: none;
  cursor: pointer;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: ${(props) => props.color};
    box-shadow: 0 0 3px ${(props) => props.color};
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: ${(props) => props.color};
    box-shadow: 0 0 3px ${(props) => props.color};
    border-radius: 50%;
  }
`;

const CurrentProgress = styled.div`
  background: ${(props) => props.color};
  box-shadow: 0 0 3px ${(props) => props.color};
  height: 2px;
  position: relative;
  top: -6px;
`;

const Time = styled.p`
  margin: 0 20px;
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.7);
`;

export const Seekbar: FC<Props> = ({ player, state }): ReactElement => {
  const { colors } = useTheme();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [manual, setManual] = useState(false);

  const [seekPlayer] = useDebouncedCallback((offset: number) => {
    player.seek(offset);
  }, 100);

  const handleSeek = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newOffset = parseInt(target.value, 10);
    setPosition(newOffset);
    seekPlayer(newOffset);
  };

  useEffect(() => {
    if (state && !manual) {
      setPosition(fixTime(state.position));
      setDuration(fixTime(state.duration));
    }
    if (manual) setManual(false);
  }, [manual, state]);

  const handleDown = () => setManual(true);

  return (
    <Container>
      <Time>{getTimeString(position)}</Time>

      <div style={{ width: '100%' }}>
        <StyledSeekbar
          color={colors.primary}
          type="range"
          min="0"
          max={duration}
          value={position}
          onMouseDown={handleDown}
          onChange={handleSeek}
        />

        <CurrentProgress
          color={colors.primary}
          style={{ width: `${(state ? position / state.duration : 0) * 100}%` }}
        />
      </div>

      <Time>{getTimeString(duration)}</Time>
    </Container>
  );
};
