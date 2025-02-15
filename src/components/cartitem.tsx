import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
type CartItemTpes = {
  idx: number;
  cartItem: any;
};
const CartItem = ({ cartItem, idx }: CartItemTpes) => {
  const index = idx;
  const { photo, productId, name, price, quantity, stock } = cartItem;

  return (
    <div className="cartItem">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
