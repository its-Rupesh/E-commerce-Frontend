import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addtoCart = () => {};
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
        <ProductCard
          productId="1"
          photo="https://m.media-amazon.com/images/I/71jG+e7roXL._SY450_.jpg"
          name="Camera"
          price={2000}
          stock={10}
          handler={addtoCart}
        />
      </main>
    </div>
  );
};

export default Home;
