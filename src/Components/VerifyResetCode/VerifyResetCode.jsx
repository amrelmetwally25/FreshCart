import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  function resetYourCode(values) {
    setIsLoading(true);
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((response) => {
        setIsLoading(false);
        if (response.data.status === "Success") {
          navigate("/resetpassword");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response?.data?.message || "An error occurred");
        setApiError(error.response?.data || { message: "An error occurred" });
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: resetYourCode,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Please enter your verification code
          </label>
          <input
            type="text"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="code....."
            id="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {apiError && (
          <div
            className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
            aria-live="assertive"
          >
            <span className="font-medium">Info alert!</span>{" "}
            {apiError.message || "An error occurred"}.
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
        </button>
      </form>
    </>
  );
}
