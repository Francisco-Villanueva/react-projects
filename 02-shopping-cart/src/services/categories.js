import { products } from "../mocks/products.json";

export const categories = [...new Set(products.map((m) => m.category))].sort(
  (a, b) => a.localeCompare(b)
);
