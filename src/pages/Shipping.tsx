import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../redux/api/orderApi";
import {
  emptyCartInfoAfterPayement,
  shippingInfoData,
} from "../redux/reducer/cartReducer";
import {
  cartReducerInitialState,
  userReducerInitialState,
} from "../types/reducer-types";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

const Shipping = () => {
  const dispatch = useDispatch();

  const [justPaid, setjustPaid] = useState(false);
  console.log(justPaid);
  const { cartItems, Total, subTotal, tax, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  // const userId = user!;
  const navigate = useNavigate();

  const [shippingInfo, setshippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const payNow = async (e: React.FormEvent) => {
  //
  //    e.preventDefault();
  //   console.log(shippingInfo);

  //   if (!Total || Total <= 0) {
  //     toast.error("Invalid amount for payment");
  //     return;
  //   }

  //   const data = {
  //     amount: Total,
  //     currency: "INR",
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/v1/create-order",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     console.log("response from backend", response);
  //     const order = await response.json();
  //     console.log("response after json", order);

  //     if (!response.ok)
  //       throw new Error(order.error || "Failed to create order");

  //     toast.success("Order Created Successfully");
  //     console.log("Order Created:", order);

  //     // Call Razorpay payment function
  //     // openRazorpay(order.id, formData);
  //   } catch (error) {
  //     toast.error("Payement Failed");
  //     console.log(error);
  //   }
  // };

  // const payNow = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!Total || Total <= 0) {
  //     toast.error("Invalid amount for payment");
  //     return;
  //   }

  //   // Validate shipping info
  //   const { address, city, state, country, pincode } = shippingInfo;
  //   if (!address || !city || !state || !country || !pincode) {
  //     toast.error("Please fill all shipping details");
  //     return;
  //   }

  //   const data = {
  //     amount: Total,
  //     currency: "INR",
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/v1/create-order",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       }
  //     );

  //     const order = await response.json();

  //     if (!response.ok) {
  //       throw new Error(order.error || "Failed to create order");
  //     }

  //     // Razorpay checkout
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual key
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "Your Company Name",
  //       description: "Test Transaction",
  //       order_id: order.id,
  //       handler: async (response) => {
  //         // Payment successful
  //         try {
  //           // You can send payment verification request to your backend here
  //           const verifyResponse = await fetch(
  //             "http://localhost:8000/api/v1/verify-payment",
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 razorpay_order_id: response.razorpay_order_id,
  //                 razorpay_payment_id: response.razorpay_payment_id,
  //                 razorpay_signature: response.razorpay_signature,
  //               }),
  //             }
  //           );

  //           const verifyResult = await verifyResponse.json();

  //           if (verifyResult.success) {
  //             toast.success("Payment Successful!");
  //             // Clear cart, redirect, etc.
  //           } else {
  //             toast.error("Payment verification failed");
  //           }
  //         } catch (verifyError) {
  //           toast.error("Payment verification error");
  //         }
  //       },
  //       prefill: {
  //         name: "Customer Name",
  //         email: "customer@example.com",
  //         contact: "9999999999"
  //       },
  //       notes: {
  //         address: JSON.stringify(shippingInfo)
  //       },
  //       theme: {
  //         color: "#3399cc"
  //       }
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     toast.error("Payment initiation failed");
  //     console.error(error);
  //   }
  // };

  const payNow = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(shippingInfo);

    dispatch(shippingInfoData(shippingInfo));

    if (!Total || Total <= 0) {
      toast.error("Invalid amount for payment");
      return;
    }

    const data = {
      amount: 10,
      currency: "INR",
    };
    const placedOrderData = {
      shippingInfo,
      user: user?._id,
      subTotal,
      tax,
      shippingCharges,
      discount,
      orderItem: cartItems,
      Total,
    };
    try {
      const response = await fetch(
        "https://e-commerce-backend-2zup.onrender.com/api/v1/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error || "Failed to create order");
      }

      // Razorpay checkout
      const options: RazorpayOptions = {
        key: "rzp_test_rUfmF2MjJhTH93", // Use environment variable
        amount: order.amount,
        currency: order.currency,
        name: "Quickmart",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(
              "https://e-commerce-backend-2zup.onrender.com/api/v1/create-order/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  placedOrderData,
                  // can i invalidate cache here
                }),
              }
            );

            const verifyResult = await verifyResponse.json();

            console.log(verifyResult);

            if (verifyResult.success) {
              toast.success("Payment Successful!");
              dispatch(orderApi.util.invalidateTags(["orders"]));
              dispatch(emptyCartInfoAfterPayement());
              setjustPaid(true);
              navigate("/orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (verifyError) {
            toast.error("Payment verification error");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: JSON.stringify(shippingInfo),
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        };
      } else {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      toast.error("Payment initiation failed");
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (cartItems.length <= 0 && !justPaid) {
  //     navigate("/cart");
  //   }
  // }, [cartItems, navigate, justPaid]);

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={payNow}>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="India">India</option>
          <option value="Nepal">Nepal</option>
          <option value="Bhutan">Bhutan</option>
        </select>
        <input
          required
          type="number"
          placeholder="PinCode"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
