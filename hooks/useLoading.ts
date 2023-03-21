import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const setTrue = useCallback(() => {
    setLoading(true);
  }, []);

  const setFalse = useCallback(() => {
    setLoading(false);
  }, []);

  return { loading, setFalse, setTrue };
};
