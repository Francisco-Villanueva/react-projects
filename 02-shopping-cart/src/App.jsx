/* HOOKS QUE VAMOS A APRENDER:
  > useContext
  > useReducers
  > useId
*/
import { products as initialProducts } from "./mocks/products.json";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from "./config";
import { useFilters } from "./hooks/useFilters";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cart";
import { useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const productsToShow = () => {
    const productsPerPage = 7;
    const firtsIndex = (currentPage - 1) * productsPerPage;
    const lastIndex = firtsIndex + productsPerPage;

    return filteredProducts.slice(firtsIndex, lastIndex);
  };
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / 7)}
        onPageChange={setCurrentPage}
      />
      <Products products={productsToShow()} />
      {/* {IS_DEVELOPMENT && <Footer />} */}
    </CartProvider>
  );
}

export default App;
