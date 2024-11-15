import React, { createContext, useState, ReactNode } from 'react';

type GenderContextType = {
  gender: string;
  setGender: (data: any) => void;
};

export const GenderContext = createContext<GenderContextType>({ gender: "WOMEN", setGender: () => { } });

export const GenderContextProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGender] = useState<string>("WOMEN");

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};
