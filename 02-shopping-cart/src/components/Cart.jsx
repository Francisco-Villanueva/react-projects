import { useId } from "react";
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, title, price, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small> Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}
export function Cart() {
  const { cart, addToCart, clearCart, removeFromCart } = useCart();
  const cartCheckboxId = useId();
  return (
    <div>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} className="cartCheckboxId" type="checkbox" />

      <aside className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((m) => (
            <CartItem key={m.id} addToCart={() => addToCart(m)} {...m} />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </div>
  );
}
