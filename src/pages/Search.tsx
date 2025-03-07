import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useAllcategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/api-Types";
import toast from "react-hot-toast";
import { server } from "../redux/store";
import { Skeleton } from "../components/Loader";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading,
    isError,
    error,
  } = useAllcategoriesQuery("");

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  console.log(categoriesResponse);

  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [maxPrice, setmaxPrice] = useState(100000000);
  const [category, setcategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productIsLoading,
    data: searchData,
    error: productError,
    isError: productIsError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }
  console.log(searchData);

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
            {!isLoading &&
              categoriesResponse?.message.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
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
        {productIsLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="searchProductList">
            {searchData?.message.map((i) => (
              <ProductCard
                productId={i._id}
                photo={i.photo}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addtoCart}
              />
            ))}
          </div>
        )}

        {searchData && searchData.totalPage > 1 && (
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
              {page} of {searchData.totalPage}
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
        )}
      </main>
    </div>
  );
};

export default Search;
