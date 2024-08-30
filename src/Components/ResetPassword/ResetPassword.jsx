import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [isLoding, setIsLoding] = useState(false);
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function resetYourPassword(values) {
    setIsLoding(true);
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((response) => {
        setIsLoding(false);
        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
        }
        setUserLogin(response.data.token);
        navigate("/");
      })
      .catch((error) => {
        setIsLoding(false);
        console.log(error.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetYourPassword,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10">
          <label
            htmlFor="default-input"
            className="block mb-2  font-medium text-gray-900 dark:text-white text-4xl"
          >
            reset your account password
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="email....."
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-10">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="newPassword....."
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoding ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </>
  );
}
