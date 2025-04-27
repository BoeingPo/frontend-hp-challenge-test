import { createContext } from "react";

type CarContextType = {
    fetchData : () => void;
};

export const CarContext = createContext<CarContextType | null>(null);

