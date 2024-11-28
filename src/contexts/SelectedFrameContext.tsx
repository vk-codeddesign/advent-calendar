"use client";
import { createContext, useContext, useState } from "react";

interface SelectedFrameContextValue {
  selectedUid: string | null;
  setSelectedUid: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectedFrameContext = createContext<SelectedFrameContextValue | undefined>(undefined);

export const SelectedFrameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  return (
    <SelectedFrameContext.Provider value={{ selectedUid, setSelectedUid }}>
      {children}
    </SelectedFrameContext.Provider>
  )
}

export const useSelectedFrame = () => {
  const context = useContext(SelectedFrameContext);
  if (!context) {
    throw new Error('useSelectedFrame must be used within a SelectedFrameProvider')
  }
  return context;
}