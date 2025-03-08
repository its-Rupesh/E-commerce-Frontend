import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartitem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItemsType } from "../types/types";
import toast from "react-hot-toast";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, subTotal, tax, Total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const [CouponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItemsType) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error(`Only ${cartItem.stock} stock are Available..!!`);
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItemsType) => {
    if (cartItem.quantity > 1)
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    else dispatch(removeCartItem(cartItem.productId));
  };
  const removeHandler = (id: string) => {
    dispatch(removeCartItem(id));
  };
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

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItem
              key={idx}
              idx={idx}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No Item Available</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{Total}</b>
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
