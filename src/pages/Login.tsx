import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  return (
    <div className="Login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="data"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Sign In</p>
          <button>
            <FcGoogle />
            <span>Sign In with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
