import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useSingleOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { server } from "../../../redux/store";
import { responseToast } from "../../../utils/feature";

type OrderItem = {
  name: string;
  photo: string;
  _id: string;
  quantity: number;
  price: number;
  productId: string;
};
const defaultData = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  Total: 0,
  orderItem: [],
  user: { name: "", _id: "" },
  _id: "",
};
type OrderType = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  status: string;
  subtotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItem: OrderItem[];
};

const TransactionManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const { data, isError } = useSingleOrderQuery(id!);
  // console.log(data);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItem,
    user: { name },
    status,
    tax,
    subTotal,
    Total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  // console.log(orderItem);

  const [order, setOrder] = useState({});

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder(id!);
    responseToast(res, navigate, "/admin/transaction");
    console.log(res);
  };

  const deleteHandler = async () => {
    const res = await deleteOrder(id!);
    responseToast(res, navigate, "/admin/transaction");
    console.log(res);
  };

  if (isError) return <Navigate to={"/404"}></Navigate>;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {orderItem.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              photo={`${server}/${i.photo}`}
              productId={i.productId}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subTotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {Total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
