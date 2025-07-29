'use client';

import { useState } from 'react';
import Confetti from 'react-confetti';
import { useMount, useWindowSize } from 'react-use';

export const ConfettiClient = () => {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useMount(() => {
    setMounted(true);
  });

  if (
    !mounted ||
    !width ||
    !height ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  ) {
    return null;
  }

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      tweenDuration={10000}
    />
  );
}