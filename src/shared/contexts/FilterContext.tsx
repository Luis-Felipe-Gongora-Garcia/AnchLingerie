import { createContext, useCallback, useContext, useState } from 'react';

interface IFilterContextData {
  filterSize: string | undefined;
  setFilterSize: (newSize: string) => void;
}

interface IAppFilterContextProps {
  children: React.ReactNode;
}

const FilterContext = createContext({} as IFilterContextData);

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterProvider: React.FC<IAppFilterContextProps> = ({
  children,
}) => {
  const [filterSize, setFilterSize] = useState('Filtro');

  const handleSetFilterSize = useCallback((newSize: string) => {
    setFilterSize(newSize);
  }, []);

  return (
    <FilterContext.Provider
      value={{ filterSize, setFilterSize: handleSetFilterSize }}
    >
      {children}
    </FilterContext.Provider>
  );
};
