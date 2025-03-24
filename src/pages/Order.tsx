import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducer-types";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { CustomError } from "../types/api-Types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};
const coloum: Column<DataType>[] = [
  { Header: "ID", accessor: "_id" },
  { Header: "Quantity", accessor: "quantity" },
  { Header: "Discount", accessor: "discount" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Status", accessor: "status" },
  { Header: "Action", accessor: "action" },
];
const Order = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError, error } = useMyOrdersQuery(user?._id!);
  console.log(data);

  const [rows, setRows] = useState<DataType[]>([]);
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const Table = TableHOC<DataType>(
    coloum,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  // _id: string;
  // amount: number;
  // quantity: number;
  // discount: number;
  // status: ReactElement;
  // action: ReactElement;

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.Total,
          quantity: i.orderItem[0].quantity,
          discount: i.discount,
          status: <span className="purple">{i.status}</span>,
          action: <Link to={`/admin/transaction/${i._id}`}></Link>,
        }))
      );
  }, [data]);

  return (
    <div className="container">
      <h1>My Orders</h1>
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Order;
