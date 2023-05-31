import { createContext, useState } from "react";

//1. Crear contexto, este es el que tenemos que consumir
export const FilterContext = createContext();

//2. Crear Provider, para proveer el contexto. Nos da acceso al contexto de arriba
export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
