import React from "react";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Product.css";
import { useCart } from "../hooks/useCart";
export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();

  const chekcProductInCart = (product) => {
    return cart.some((e) => e.id === product.id);
  };
  return (
    <main className="products">
      <ul>
        {products.map((m) => {
          const isProductInCart = chekcProductInCart(m);
          return (
            <li key={m.id}>
              <img src={m.thumbnail} alt={m.title} />

              <div>
                <strong>{m.title}</strong> - ${m.price}
              </div>
              <div>
                <button
                  style={{ background: isProductInCart ? "red" : "#09f" }}
                  onClick={() =>
                    isProductInCart ? removeFromCart(m) : addToCart(m)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
