import { useState } from "react";
import ProductCard from "../components/ProductCard";
const Search = () => {
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [maxPrice, setmaxPrice] = useState(100000);
  const [category, setcategory] = useState("");
  const [page, setPage] = useState(1);

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  const addtoCart = () => {};
  return (
    <div className="searchPage">
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setsort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low To High)</option>
            <option value="dsc">Price (High To Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          ></input>
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Sample1">Sample1</option>
            <option value="Sample2">Sample2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search By name"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <div className="searchProductList">
          <ProductCard
            productId="1"
            photo="https://m.media-amazon.com/images/I/71jG+e7roXL._SY450_.jpg"
            name="Camera"
            price={2000}
            stock={10}
            handler={addtoCart}
          />
        </div>
        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            Prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
