declare type AudioSegment = {
  type: "audio"
  filename: string
  duration: number
}

declare type SilenceSegment = {
  type: "silence"
  ratio: number
}

declare type AudioFile = AudioSegment | SilenceSegment
