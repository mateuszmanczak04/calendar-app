import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(screen.width);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return width;
};

export default useWindowWidth;
