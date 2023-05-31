import { useContext } from "react";
import { FilterContext } from "../filters";
export function useFilters() {
  // const [filters, setFilters] = useState({
  //   category: "all",
  //   minPrice: 0,
  // });

  const { filters, setFilters } = useContext(FilterContext);

  const filterProducts = (products) => {
    return products.filter((e) => {
      return (
        e.price >= filters.minPrice &&
        (filters.category === "all" || e.category === filters.category)
      );
    });
  };

  return { filterProducts, setFilters, filters };
}
