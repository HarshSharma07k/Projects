import { useAudio } from "react-use";

export const FinishAudio = () => {
  const [audio] = useAudio({ src: "/finish.mp3", autoPlay: true });

  return audio;
};