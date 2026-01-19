'use client';
import React, { createContext, useContext, useState } from 'react';

type CursorType = 'DEFAULT' | 'PROJECT' | 'LOCKED';

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'DEFAULT',
  setCursorType: () => {},
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorType, setCursorType] = useState<CursorType>('DEFAULT');
  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);