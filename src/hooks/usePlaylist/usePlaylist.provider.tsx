import React, { createContext, FC, useContext, useState } from 'react';

const audioFile: AudioFile[] = require('../../data/relaxation.json');

const isAudioSegment = (segment: AudioFile): segment is AudioSegment =>
  segment.type === 'audio';

type PlaylistContextType = {
  audioSegments: DurationSegment[];
  minutes: number;
  setMinutes: (value: number) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider: FC<{}> = ({ children }) => {
  const [minutes, setMinutes] = useState(30);

  const durationMs = minutes * 60 * 1000;

  const audioDuration = audioFile
    .filter(isAudioSegment)
    .reduce((total, segment) => total + segment.duration, 0);

  const silenceDuration = durationMs - audioDuration;

  let durationTime = -1;

  const audioSegments: DurationSegment[] = audioFile.map((segment) => {
    const durationTally = durationTime;

    if (segment.type === 'audio') {
      durationTime += segment.duration;

      return {
        type: 'audio',
        duration: segment.duration,
        filename: segment.filename,
        start: durationTally + 1,
        end: durationTally + segment.duration,
      } as DurationAudioSegment;
    } else {
      const duration = Math.round(segment.ratio * silenceDuration);
      durationTime += Math.round(segment.ratio * silenceDuration);

      return {
        type: 'silence',
        duration,
        start: durationTally + 1,
        end: durationTally + duration,
      } as DurationSilenceSegment;
    }
  });

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
