import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer-types";
import {
  useAllUserQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const _id = user?._id!;
  // const { _id } = user ?? {};
  console.log(_id);

  const [deleteUser] = useDeleteUserMutation();

  const { data } = useAllUserQuery(_id!);
  console.log(data);

  // const deleteUserHandler = async (id: string) => {
  //   try {
  //     // id = id + "a";
  //     const res = await deleteUser({ id, _id });
  //     console.log(res);
  //     if (res.data) toast.success(res.data.message);
  //     else toast.error((res.error as FetchBaseQueryError).data.message);
  //     console.log(id);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Internal Error");
  //   }
  // };

  interface ErrorResponse {
    success: boolean;
    message: string;
  }

  const deleteUserHandler = async (id: string) => {
    try {
      if (id === _id) {
        return toast.error("Admin Cannot be Deleted");
      }

      const res = await deleteUser({ id, _id });
      console.log(res);

      if (res.data) {
        toast.success(res.data.message);
      } else if ("data" in res.error) {
        const errorData = res.error.data as ErrorResponse;
        toast.error(errorData.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
    }
  };

  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  useEffect(() => {
    if (data) {
      setRows(
        data.user.map((user) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={user.photo}
              alt={user.name}
            />
          ),
          name: user.name,
          email: user.email,
          gender: user.gender,
          role: user.role!,
          action: (
            <button onClick={() => deleteUserHandler(user._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
