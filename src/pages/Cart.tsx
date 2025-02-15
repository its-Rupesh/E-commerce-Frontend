import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartitem";
import { Link } from "react-router-dom";

const subtotalArray: number[] = [];
const subtotal: number = subtotalArray.reduce((acc, item) => acc + item, 0);
const cartItems = [
  {
    productId: "123",
    photo: "https://m.media-amazon.com/images/I/71jG+e7roXL._SY450_.jpg",
    name: "MacBook",
    price: 3000,
    quantity: 40,
    stock: 10,
  },
];
const discount = 400;
const tax: number = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [CouponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (Math.random() > 0.5) setisValidCouponCode(true);
      else setisValidCouponCode(false);
    }, 1000);
    return () => {
      clearTimeout(id);
      setisValidCouponCode(false);
    };
  }, [CouponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItem key={idx} idx={idx} cartItem={i} />
          ))
        ) : (
          <h1>No Item Available</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={CouponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {CouponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{CouponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />{" "}
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
