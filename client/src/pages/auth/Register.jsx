import React, { useState } from "react";
import validateRegister from "../../utils/validators";
import useAuthStore from "../../store/auth-store";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  // Javascript
  // Get data from Zustand
  const actionRegister = useAuthStore((state) => state.actionRegister);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const hdlOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    const error = validateRegister(form);
    // console.log(error)
    if (error) {
      return setFormErrors(error);
    }
    // Step 1 Validate with Joi
    // Step 2 Send to back
    actionRegister(form);

    setForm(initialState);
    setFormErrors({});
  };
  return (
    <div className="bg-green-50 flex w-full h-full p-2">
      <div className="w-4/5">Coming Soon...</div>
      <div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold mb-4">Register</p>
          {/* Form Register */}
          <form onSubmit={hdlSubmit} className="flex flex-col space-y-4">
            <input
              value={form.email}
              name="email"
              onChange={hdlOnChange}
              placeholder="Email"
              className="p-2 rounded w-64 
              border border-gray-300 shadow-md"
            />
            {formErrors.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}

            <input
              value={form.password}
              name="password"
              type="password"
              onChange={hdlOnChange}
              placeholder="Password"
              className="p-2 rounded w-64 
              border border-gray-300 shadow-md"
            />
            {formErrors.password && (
              <span className="text-red-500 text-xs">
                {formErrors.password}
              </span>
            )}
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={hdlOnChange}
              placeholder="Confirm Password"
              className="p-2 rounded w-64 
              border border-gray-300 shadow-md"
            />
            {formErrors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {formErrors.confirmPassword}
              </span>
            )}
            <button
              className="bg-blue-400 rounded-md
              hover:bg-blue-700 hover:scale-105 hover:duration-200
              font-bold text-white shadow-md
              "
            >
              Register
            </button>
          </form>
          {/* /Form Register */}
        </div>
      </div>
    </div>
  );
};

export default Register;
