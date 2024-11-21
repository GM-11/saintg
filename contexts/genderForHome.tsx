import React, { createContext, useState, ReactNode } from "react";

type GenderContextType = {
  gender: string;
  setGender: (data: any) => void;
  showGender: boolean;
  setShowGender: (data: any) => void;
};

export const GenderContext = createContext<GenderContextType>({
  gender: "WOMEN",
  setGender: () => {},
  showGender: false,
  setShowGender: () => {},
});

export const GenderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [gender, setGender] = useState<string>("WOMEN");
  const [showGender, setShowGender] = useState(false);

  return (
    <GenderContext.Provider
      value={{ gender, setGender, showGender, setShowGender }}
    >
      {children}
    </GenderContext.Provider>
  );
};
