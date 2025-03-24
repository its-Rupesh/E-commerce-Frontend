import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actions, Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer-types";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { useAllOrderQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/api-Types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { data, isError, isLoading, error } = useAllOrderQuery("");

  console.log(data);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.allOrder.map((i) => ({
          amount: i.Total,
          discount: i.discount,
          quantity: i.orderItem[0].quantity,
          status: <span className="purple">{i.status}</span>,
          user: i.user.name,
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Transaction;
