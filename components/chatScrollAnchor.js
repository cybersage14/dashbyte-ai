import { useEffect, useRef } from 'react';

export default function ChatScrollAnchor({ trackVisibility }) {
  const ref = useRef();

  useEffect(() => {
    if (trackVisibility) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [trackVisibility]);

  return <div ref={ref} />;
}
