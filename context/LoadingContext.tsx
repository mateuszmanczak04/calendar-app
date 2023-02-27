import { useSession } from 'next-auth/react';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export const LoadingContext = createContext<{
  loading: boolean;
  setTrue: () => void;
  setFalse: () => void;
}>({ loading: false, setTrue: () => null, setFalse: () => {} });

export const LoadingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  return (
    <LoadingContext.Provider value={{ loading, setTrue, setFalse }}>
      {children}
    </LoadingContext.Provider>
  );
};
