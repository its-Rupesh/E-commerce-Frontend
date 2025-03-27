import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItemsType } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery(""); // data from latest api

  const addtoCartHandler = (cartItem: CartItemsType) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock..!!");
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} Added to Cart..!!`);
  };

  if (isError) toast.error("Cannot Fetch Products");
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.message.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              photo={i.photo}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addtoCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
