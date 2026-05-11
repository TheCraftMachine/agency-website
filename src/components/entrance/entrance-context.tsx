'use client';
import { createContext, useContext, useState } from 'react';

type EntranceContextValue = {
  hasEntered: boolean;
  markEntered: () => void;
};

const EntranceContext = createContext<EntranceContextValue>({
  hasEntered: false,
  markEntered: () => {},
});

export function EntranceProvider({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  return (
    <EntranceContext.Provider value={{ hasEntered, markEntered: () => setHasEntered(true) }}>
      {children}
    </EntranceContext.Provider>
  );
}

export function useEntrance() {
  return useContext(EntranceContext);
}
