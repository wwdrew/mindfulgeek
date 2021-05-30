import React, { createContext, FC, useContext, useState } from 'react';

const audioFile: AudioFile[] = require('../../data/relaxation.json');

const isAudioSegment = (segment: AudioFile): segment is AudioSegment =>
  segment.type === 'audio';

type PlaylistContextType = {
  audioSegments: AudioSegment[];
  minutes: number;
  setMinutes: (value: number) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider: FC<{}> = ({ children }) => {
  const [minutes, setMinutes] = useState(30);

  const durationMs = minutes * 60 * 1000;
  const audioSegments = audioFile.filter(isAudioSegment);
  const audioDuration = audioSegments.reduce(
    (total, segment) => total + segment.duration,
    0
  );
  const silenceDuration = durationMs - audioDuration;
  const totalDuration = audioDuration + silenceDuration;

  console.log({
    durationMs,
    audioDuration,
    silenceDuration,
    totalDuration,
  });

  return (
    <PlaylistContext.Provider value={{ audioSegments, minutes, setMinutes }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export function usePlaylist() {
  const context = useContext(PlaylistContext);

  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }

  return context;
}
