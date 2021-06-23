declare type AudioSegment = {
  type: 'audio';
  filename: string;
  duration: number;
};

declare type DurationAudioSegment = AudioSegment & {
  start: number;
  end: number;
};

declare type SilenceSegment = {
  type: 'silence';
  ratio: number;
};

declare type DurationSilenceSegment = {
  type: 'silence';
  duration: number;
  start: number;
  end: number;
};

declare type AudioFile = AudioSegment | SilenceSegment;

declare type DurationSegment = DurationAudioSegment | DurationSilenceSegment;

declare type PlayList = AudioThing[];
