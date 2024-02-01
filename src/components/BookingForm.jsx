import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketQuantity: 1,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    ticketQuantity: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear previous error messages when input changes
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message for the changed input field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    let formValid = true;
    const newErrors = { ...errors };

    if (formData.name.trim() === "") {
      newErrors.name = "Please enter your name.";
      formValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email.";
      formValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      formValid = false;
    }

    if (formData.ticketQuantity <= 0 || isNaN(formData.ticketQuantity)) {
      newErrors.ticketQuantity = "Please enter a valid quantity.";
      formValid = false;
    }

    if (formValid) {
      // Handle form submission
      localStorage.setItem("formData", JSON.stringify(formData));
      alert("Form submitted!");
      console.log("Form submitted:", formData);
      navigate("/");
    } else {
      // Update errors state with new error messages
      setErrors(newErrors);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-gray-700 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Booking Form
              </h1>
              <div className="w-full flex-1 mt-2">
                <div className="flex flex-col items-center"></div>
                <div className="my-5 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-white tracking-wide font-medium bg-gray-700 transform translate-y-1/2">
                    Enter your Booking Details
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-800 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-800 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-800 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="number"
                    placeholder="Quantity"
                    name="ticketQuantity"
                    value={formData.ticketQuantity}
                    onChange={handleChange}
                  />
                  {errors.ticketQuantity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ticketQuantity}
                    </p>
                  )}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSubmit}
                  >
                    <span className="ml-3">Submit</span>
                  </button>
                  <p className="mt-6 text-xs text-white text-center">
                    By setting up, you agree to our
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-200 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPage;
